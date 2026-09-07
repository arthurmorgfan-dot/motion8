// ============================================================
// MOTION8 — Character Generation Preview
// ------------------------------------------------------------
// RESPONSIBILITIES:
// - Displays real generated character animation frames.
// - Automatically plays the generated animation.
// - Allows manual frame selection.
// - Displays the animation timeline.
// - Preserves pixel-art rendering.
// - Supports transparent character backgrounds.
// - Provides the character preview and export controls.
//
// DOES NOT CONTROL:
// - Character generation.
// - PixelLab API communication.
// - Background generation.
// - Background editing.
// - Authentication.
// - Billing.
// - Database persistence.
// ============================================================

"use client";

import { useEffect, useState } from "react";

type GenerationPreviewProps = {
  frames: string[];
  pixelSize: string;
};

function getImageSource(frame: string) {
  if (frame.startsWith("data:")) {
    return frame;
  }

  return `data:image/png;base64,${frame}`;
}

function PixelFrame({
  frame,
  pixelSize,
}: {
  frame: string;
  pixelSize: number;
}) {
  return (
    <img
      src={getImageSource(frame)}
      alt="Generated pixel-art animation frame"
      draggable={false}
      className="block"
      style={{
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        imageRendering: "pixelated",
        objectFit: "contain",
      }}
    />
  );
}

function parsePixelSize(value: string) {
  const match = value.match(/^(\d+)/);

  if (!match) {
    return 32;
  }

  return Number(match[1]);
}

export default function GenerationPreview({
  frames,
  pixelSize,
}: GenerationPreviewProps) {
  const [currentFrame, setCurrentFrame] = useState(0);

  const size = parsePixelSize(pixelSize);

  // ----------------------------------------------------------
  // Keep the selected frame valid if a new animation contains
  // fewer frames than the previous one.
  // ----------------------------------------------------------

  useEffect(() => {
    setCurrentFrame(0);
  }, [frames]);

  // ----------------------------------------------------------
  // Automatic animation playback.
  // ----------------------------------------------------------

  useEffect(() => {
    if (frames.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentFrame((frame) => (frame + 1) % frames.length);
    }, 140);

    return () => clearInterval(interval);
  }, [frames]);

  if (frames.length === 0) {
    return null;
  }

  const current = frames[currentFrame];

  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-sm text-white">
            Generated Animation
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Real PixelLab Generation
          </p>
        </div>

        <span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-400">
          {pixelSize}
        </span>
      </div>

      {/* ----------------------------------------------------
          Main transparent character preview.
          The checkerboard makes transparency visible.
          ---------------------------------------------------- */}

      <div
        className="flex min-h-[420px] items-center justify-center p-8"
        style={{
          backgroundColor: "#111111",
          backgroundImage: `
            linear-gradient(45deg, #181818 25%, transparent 25%),
            linear-gradient(-45deg, #181818 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #181818 75%),
            linear-gradient(-45deg, transparent 75%, #181818 75%)
          `,
          backgroundSize: "24px 24px",
          backgroundPosition:
            "0 0, 0 12px, 12px -12px, -12px 0px",
        }}
      >
        <div className="flex min-h-[300px] w-full max-w-[520px] items-center justify-center border border-white/10 bg-black/10 p-10">
          <PixelFrame
            frame={current}
            pixelSize={Math.min(256, Math.max(64, size * 8))}
          />
        </div>
      </div>

      {/* ----------------------------------------------------
          Timeline
          ---------------------------------------------------- */}

      <div className="border-t border-white/10 px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            Animation Timeline
          </span>

          <span className="text-xs text-zinc-600">
            {frames.length}{" "}
            {frames.length === 1 ? "frame" : "frames"}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {frames.map((frame, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentFrame(index)}
              aria-label={`Select frame ${index + 1}`}
              className={`flex h-20 min-w-16 items-center justify-center rounded-lg border transition ${
                currentFrame === index
                  ? "border-white bg-white/10"
                  : "border-white/10 bg-[#111111] hover:border-white/30"
              }`}
            >
              <PixelFrame
                frame={frame}
                pixelSize={28}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------
          Footer controls
          ---------------------------------------------------- */}

      <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
        <span className="text-xs text-zinc-500">
          Frame {currentFrame + 1} / {frames.length}
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/30"
          >
            Edit
          </button>

          <button
            type="button"
            className="rounded-lg bg-white px-4 py-2 text-sm text-black transition hover:bg-zinc-200"
          >
            Export
          </button>
        </div>
      </div>
    </section>
  );
}