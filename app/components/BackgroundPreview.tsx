// ============================================================
// MOTION8 — Background Preview
// ------------------------------------------------------------
// RESPONSIBILITIES:
// - Displays the generated pixel-art background.
// - Provides a large visual preview of the generated world.
// - Provides an Edit action that opens the background editor.
// - Provides the foundation for future export functionality.
//
// DOES NOT CONTROL:
// - AI generation.
// - Prompt handling.
// - PixelLab API communication.
// - Character generation.
// - Animation timelines.
// - Editing tools themselves.
// - Authentication.
// - Billing.
// - Database logic.
// ============================================================

"use client";

type BackgroundPreviewProps = {
  imageSrc: string;
  onEdit: () => void;
};

export default function BackgroundPreview({
  imageSrc,
  onEdit,
}: BackgroundPreviewProps) {
  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
      {/* Preview Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-sm text-white">
            Generated Background
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            PixelLab Preview
          </p>
        </div>

        <span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-400">
          320 × 180
        </span>
      </div>

      {/* Generated Pixel-Art */}
      <div className="flex min-h-[420px] items-center justify-center bg-[#111111] p-8">
        <div className="w-full max-w-[520px] overflow-hidden border border-white/10 bg-black">
          <img
            src={`data:image/png;base64,${imageSrc}`}
            alt="Generated pixel-art background"
            className="block h-auto w-full"
            style={{
              imageRendering: "pixelated",
            }}
          />
        </div>
      </div>

      {/* Preview Actions */}
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
        <span className="text-xs text-zinc-500">
          Background Preview
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEdit}
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