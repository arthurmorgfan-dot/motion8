// ============================================================
// MOTION8 — Background Editor
// ------------------------------------------------------------
// RESPONSIBILITIES:
// - Provides the editing workspace for generated backgrounds.
// - Renders generated artwork on a native pixel canvas.
// - Preserves the original 320 × 180 pixel dimensions.
// - Allows the user to paint individual pixels.
// - Provides a color picker for the pixel brush.
// - Displays the selected pixel coordinates.
// - Stores canvas states for Undo and Redo.
// - Clears Redo history when a new edit is made.
// - Provides the foundation for future editing tools.
//
// DOES NOT CONTROL:
// - AI generation.
// - Prompt handling.
// - PixelLab API communication.
// - Character generation.
// - Animation timelines.
// - Brush sizes beyond the current single-pixel brush.
// - Advanced color management.
// - Image editing beyond the current pixel brush.
// - Export processing.
// - Authentication.
// - Billing.
// - Database logic.
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundEditorProps = {
  imageSrc: string;
  onBack: () => void;
};

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 180;

const DEFAULT_COLOR = "#ffffff";

export default function BackgroundEditor({
  imageSrc,
  onBack,
}: BackgroundEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Stores previous canvas states for Undo.
  const undoStackRef = useRef<ImageData[]>([]);

  // Stores canvas states that can be restored with Redo.
  const redoStackRef = useRef<ImageData[]>([]);

  const [selectedPixel, setSelectedPixel] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [undoCount, setUndoCount] = useState(0);
  const [redoCount, setRedoCount] = useState(0);
  const [brushColor, setBrushColor] = useState(DEFAULT_COLOR);

  // Load the generated image onto the canvas.
  // A newly generated image starts a completely fresh history.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new Image();

    image.onload = () => {
      context.clearRect(
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );

      context.imageSmoothingEnabled = false;

      context.drawImage(
        image,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );

      undoStackRef.current = [];
      redoStackRef.current = [];

      setUndoCount(0);
      setRedoCount(0);
      setSelectedPixel(null);
    };

    image.src = `data:image/png;base64,${imageSrc}`;
  }, [imageSrc]);

  function handleCanvasClick(
    event: React.MouseEvent<HTMLCanvasElement>
  ) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    const x = Math.floor(
      (event.clientX - rect.left) * scaleX
    );

    const y = Math.floor(
      (event.clientY - rect.top) * scaleY
    );

    if (
      x < 0 ||
      x >= CANVAS_WIDTH ||
      y < 0 ||
      y >= CANVAS_HEIGHT
    ) {
      return;
    }

    // Save the current canvas state BEFORE making the edit.
    const previousState = context.getImageData(
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

    undoStackRef.current.push(previousState);

    // A new edit creates a new branch.
    // Therefore, previously available Redo states are no longer valid.
    redoStackRef.current = [];

    setUndoCount(undoStackRef.current.length);
    setRedoCount(0);

    // Paint the selected pixel using the current brush color.
    context.fillStyle = brushColor;
    context.fillRect(x, y, 1, 1);

    setSelectedPixel({ x, y });
  }

  function handleUndo() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const previousState = undoStackRef.current.pop();

    if (!previousState) {
      return;
    }

    // Save the current state so Redo can restore it.
    const currentState = context.getImageData(
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

    redoStackRef.current.push(currentState);

    // Restore the previous canvas state.
    context.putImageData(previousState, 0, 0);

    setUndoCount(undoStackRef.current.length);
    setRedoCount(redoStackRef.current.length);
    setSelectedPixel(null);
  }

  function handleRedo() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const nextState = redoStackRef.current.pop();

    if (!nextState) {
      return;
    }

    // Save the current state so Undo can restore it.
    const currentState = context.getImageData(
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

    undoStackRef.current.push(currentState);

    // Restore the Redo state.
    context.putImageData(nextState, 0, 0);

    setUndoCount(undoStackRef.current.length);
    setRedoCount(redoStackRef.current.length);
    setSelectedPixel(null);
  }

  return (
    <section className="min-h-[calc(100vh-81px)] px-6 py-10 sm:px-10">
      <div className="mx-auto w-full max-w-5xl">

        {/* Editor Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Pixel Art Editor
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Edit your world.
            </h1>

            <p className="mt-3 text-sm text-zinc-400">
              Click a pixel to paint it.
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/30"
          >
            Back
          </button>
        </div>

        {/* Editor Workspace */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">

          <div className="flex min-h-[560px] items-center justify-center bg-[#111111] p-8">
            <div className="w-full max-w-4xl overflow-hidden border border-white/10 bg-black">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                onClick={handleCanvasClick}
                className="block h-auto w-full cursor-crosshair"
                style={{
                  imageRendering: "pixelated",
                }}
              />
            </div>
          </div>

          {/* Pixel Information */}
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-500">
                Canvas
              </span>

              <span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-400">
                {CANVAS_WIDTH} × {CANVAS_HEIGHT}
              </span>
            </div>

            <span className="text-xs text-zinc-500">
              {selectedPixel
                ? `Painted pixel ${selectedPixel.x}, ${selectedPixel.y}`
                : "Click a pixel"}
            </span>
          </div>

          {/* Editor Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-4">

            {/* Brush Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500">
                Brush
              </span>

              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 transition hover:border-white/30">
                <span
                  className="h-4 w-4 rounded border border-white/20"
                  style={{
                    backgroundColor: brushColor,
                  }}
                />

                <span className="text-xs text-zinc-400">
                  Color
                </span>

                <input
                  type="color"
                  value={brushColor}
                  onChange={(event) =>
                    setBrushColor(event.target.value)
                  }
                  className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
                  aria-label="Choose brush color"
                />
              </label>
            </div>

            {/* History + Save */}
            <div className="flex gap-2">

              {/* Undo */}
              <button
                type="button"
                onClick={handleUndo}
                disabled={undoCount === 0}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Undo
              </button>

              {/* Redo */}
              <button
                type="button"
                onClick={handleRedo}
                disabled={redoCount === 0}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Redo
              </button>

              {/* Save */}
              <button
                type="button"
                className="rounded-lg bg-white px-4 py-2 text-sm text-black transition hover:bg-zinc-200"
              >
                Save
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}