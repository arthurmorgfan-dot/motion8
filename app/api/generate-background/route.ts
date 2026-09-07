// ============================================================
// MOTION8 — Background Generation API
// ------------------------------------------------------------
// RESPONSIBILITIES:
// - Receives a background prompt from the MOTION8 frontend.
// - Sends the prompt to PixelLab securely from the server.
// - Keeps the PixelLab API key away from the browser.
// - Returns the generated image to the frontend.
//
// DOES NOT CONTROL:
// - Background generator UI.
// - Character generation.
// - Animation.
// - Image editing.
// - Authentication.
// - Billing.
// - Database logic.
// ============================================================

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "A prompt is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.PIXELLAB_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "PixelLab API key is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.pixellab.ai/v2/create-image-pixflux",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: prompt,
          image_size: {
            width: 320,
            height: 180,
          },
          no_background: false,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.detail ||
            data?.message ||
            "PixelLab generation failed.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      image: data.image?.base64,
    });
  } catch (error) {
    console.error("MOTION8 background generation error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating the background." },
      { status: 500 }
    );
  }
}