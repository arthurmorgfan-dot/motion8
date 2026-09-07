// ============================================================
// MOTION8 — Character Generation API
// ============================================================
// RESPONSIBILITIES:
// - Receives character-generation settings from MOTION8.
// - Receives the requested animation frame count.
// - Creates a single pixel-art character with PixelLab.
// - Forces the character onto a transparent background.
// - Starts PixelLab's v3 animation generation.
// - Passes the requested frame count to PixelLab.
// - Keeps the PixelLab API key securely on the server.
// - Returns the animation job ID to the frontend.
//
// DOES NOT CONTROL:
// - Character generator UI.
// - Animation timeline UI.
// - Background generation.
// - Background editing.
// - Authentication.
// - Billing.
// - Database logic.
// - Final animation playback.
// ============================================================

import { NextResponse } from "next/server";

function parsePixelSize(value: string): number | null {
  const match = value.match(/^(\d+)\s*×\s*(\d+)$/);

  if (!match || match[1] !== match[2]) {
    return null;
  }

  return Number(match[1]);
}

function mapDirection(direction: string) {
  switch (direction) {
    case "Front":
      return "south";

    case "Back":
      return "north";

    case "Side":
    default:
      return "east";
  }
}

function mapView(direction: string) {
  switch (direction) {
    case "Side":
      return "side";

    case "Front":
    case "Back":
    default:
      return "low top-down";
  }
}

function mapAnimation(animation: string) {
  switch (animation) {
    case "Walk":
      return "walk";

    case "Run":
      return "run";

    case "Attack":
      return "attack";

    case "Idle":
    default:
      return "idle";
  }
}

function isValidFrameCount(frames: number) {
  return (
    Number.isInteger(frames) &&
    frames >= 4 &&
    frames <= 16 &&
    frames % 2 === 0
  );
}

export async function POST(request: Request) {
  try {
    const {
      prompt,
      pixelSize,
      animation,
      frames,
      direction,
      style,
      colorPalette,
    } = await request.json();

    // --------------------------------------------------------
    // Validate API key
    // --------------------------------------------------------

    const apiKey = process.env.PIXELLAB_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "PixelLab API key is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------------
    // Validate prompt
    // --------------------------------------------------------

    if (!prompt?.trim()) {
      return NextResponse.json(
        {
          error: "A character prompt is required.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // Validate pixel size
    // --------------------------------------------------------

    const size = parsePixelSize(pixelSize);

    if (!size) {
      return NextResponse.json(
        {
          error: "Invalid pixel size.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // Current real character animation pipeline supports
    // 32 × 32 and above.
    // --------------------------------------------------------

    if (![32, 64, 128].includes(size)) {
      return NextResponse.json(
        {
          error:
            "16 × 16 character animation is not supported by the current animation pipeline. Please choose 32 × 32 or larger.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // Validate requested frame count.
    //
    // PixelLab v3 supports 4–16 frames, even numbers only.
    // --------------------------------------------------------

    if (!isValidFrameCount(frames)) {
      return NextResponse.json(
        {
          error:
            "Invalid frame count. Choose an even number between 4 and 16.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // PixelLab v3 has a total pixel budget:
    //
    // width × height × frames <= 524,288
    //
    // Our currently supported sizes all fit within that limit
    // for the available frame options.
    // --------------------------------------------------------

    const totalPixelBudget = size * size * frames;

    if (totalPixelBudget > 524288) {
      return NextResponse.json(
        {
          error:
            "This pixel size and frame count combination exceeds PixelLab's animation limit. Please choose fewer frames or a smaller pixel size.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // Prepare generation settings
    // --------------------------------------------------------

    const mappedDirection = mapDirection(direction);
    const mappedView = mapView(direction);
    const mappedAnimation = mapAnimation(animation);

    const description = `
Create a game-ready pixel-art character.

Character:

${prompt.trim()}

Visual style:

${style || "Classic Pixel Art"}

Color palette:

${colorPalette || "Default"}

Requirements:

- Single character only.
- Character must be centered.
- Clean readable silhouette.
- Consistent pixel-art proportions.
- No environment.
- No scenery.
- No floor.
- No objects behind the character.
- Transparent background.
`.trim();

    // --------------------------------------------------------
    // STEP 1
    //
    // Create the character's first frame.
    //
    // IMPORTANT:
    // no_background: true guarantees that the character
    // is generated without a scene/background.
    // --------------------------------------------------------

    const characterResponse = await fetch(
      "https://api.pixellab.ai/v2/create-image-pixen",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          image_size: {
            width: size,
            height: size,
          },
          no_background: true,
          outline: "single color black outline",
          view: mappedView,
          direction: mappedDirection,
        }),
      }
    );

    const characterData = await characterResponse.json();

    if (!characterResponse.ok) {
      console.error(
        "PixelLab character creation failed:",
        characterData
      );

      return NextResponse.json(
        {
          error:
            characterData?.detail ||
            characterData?.message ||
            "PixelLab character creation failed.",
        },
        {
          status: characterResponse.status,
        }
      );
    }

    const firstFrame = characterData?.image?.base64;

    if (!firstFrame) {
      return NextResponse.json(
        {
          error:
            "PixelLab created the character but returned no image.",
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------------
    // STEP 2
    //
    // Send the generated first frame into PixelLab's
    // modern v3 animation pipeline.
    //
    // v3 allows MOTION8 to explicitly control the number
    // of animation frames.
    // --------------------------------------------------------

    const animationResponse = await fetch(
      "https://api.pixellab.ai/v2/animate-with-text-v3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: mappedAnimation,

          first_frame: {
            base64: firstFrame,
          },

          frame_count: frames,

          no_background: true,
        }),
      }
    );

    const animationData = await animationResponse.json();

    if (!animationResponse.ok) {
      console.error(
        "PixelLab animation creation failed:",
        animationData
      );

      return NextResponse.json(
        {
          error:
            animationData?.detail ||
            animationData?.message ||
            "PixelLab animation creation failed.",
        },
        {
          status: animationResponse.status,
        }
      );
    }

    const jobId = animationData?.background_job_id;

    if (!jobId) {
      return NextResponse.json(
        {
          error:
            "PixelLab started the animation but returned no job ID.",
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------------
    // Return the animation job ID.
    //
    // The frontend will use this in the next step to check
    // when PixelLab has finished generating the frames.
    // --------------------------------------------------------

    return NextResponse.json({
      jobId,
      status: "processing",
      pixelSize: size,
      frames,
    });
  } catch (error) {
    console.error(
      "MOTION8 character generation error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while generating the character.",
      },
      {
        status: 500,
      }
    );
  }
}