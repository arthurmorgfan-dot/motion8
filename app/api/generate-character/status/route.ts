// ============================================================
// MOTION8 — Character Generation Status API
// ------------------------------------------------------------
// RESPONSIBILITIES:
// - Receives a PixelLab animation job ID.
// - Checks the job status securely on the server.
// - Returns completed animation frames to the frontend.
// - Reports processing and failed states.
//
// DOES NOT CONTROL:
// - Character generation itself.
// - Character generator UI.
// - Animation timeline UI.
// - Background generation.
// - Background editing.
// - Authentication.
// - Billing.
// - Database logic.
// ============================================================

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // --------------------------------------------------------
    // Read the PixelLab job ID from the URL.
    // Example:
    // /api/generate-character/status?jobId=abc123
    // --------------------------------------------------------

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        {
          error: "A generation job ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // Make sure the PixelLab API key stays server-side.
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
    // Ask PixelLab for the current job status.
    // --------------------------------------------------------

    const response = await fetch(
      `https://api.pixellab.ai/v2/background-jobs/${encodeURIComponent(
        jobId
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },

        // Don't let Next.js serve an old job status.
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "PixelLab character job status failed:",
        data
      );

      return NextResponse.json(
        {
          error:
            data?.detail ||
            data?.message ||
            "Unable to check PixelLab generation status.",
        },
        {
          status: response.status,
        }
      );
    }

    // --------------------------------------------------------
    // PixelLab reports the finished result through
    // last_response.
    // --------------------------------------------------------

    const status = data?.status;
    const lastResponse = data?.last_response;

    // --------------------------------------------------------
    // Still processing.
    // --------------------------------------------------------

    if (
      status !== "completed" &&
      status !== "failed" &&
      status !== "error"
    ) {
      return NextResponse.json({
        status: "processing",
      });
    }

    // --------------------------------------------------------
    // Generation failed.
    // --------------------------------------------------------

    if (
      status === "failed" ||
      status === "error"
    ) {
      return NextResponse.json(
        {
          status: "failed",
          error:
            data?.error ||
            data?.message ||
            lastResponse?.error ||
            "PixelLab failed to generate the animation.",
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------------
    // Extract generated animation frames.
    //
    // PixelLab returns generated images inside:
    // last_response.images
    // --------------------------------------------------------

    const images = lastResponse?.images;

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        {
          status: "failed",
          error:
            "PixelLab completed the job but returned no animation frames.",
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------------
    // Return only the image data MOTION8 needs.
    //
    // Keeping this response intentionally small means the
    // frontend doesn't need to know anything about PixelLab's
    // internal response structure.
    // --------------------------------------------------------

    const frames = images
      .map((image: { base64?: string }) => image?.base64)
      .filter(
        (base64: string | undefined): base64 is string =>
          Boolean(base64)
      );

    if (frames.length === 0) {
      return NextResponse.json(
        {
          status: "failed",
          error:
            "PixelLab returned animation images without usable frame data.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      status: "completed",
      frames,
    });
  } catch (error) {
    console.error(
      "MOTION8 character status error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while checking the character generation.",
      },
      {
        status: 500,
      }
    );
  }
}