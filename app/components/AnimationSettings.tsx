"use client";

// ============================================================
//
// MOTION8 — Animation Settings
//
// ------------------------------------------------------------
//
// RESPONSIBILITIES:
//
// - Provides the animation settings panel for MOTION8.
// - Allows the user to choose an animation type.
// - Stores the selected animation type.
// - Allows the user to describe the desired movement.
// - Allows the user to choose the animation frame count.
// - Tracks the Action Details character count.
// - Provides the visual foundation for future animation controls.
//
// DOES NOT CONTROL:
//
// - Image uploading.
// - Image preview rendering.
// - AI animation generation.
// - Animation processing.
// - Timeline logic.
// - Frame editing.
// - Exporting.
// - Authentication.
// - Billing.
// - Database logic.
//
// ============================================================

import { useState } from "react";

// ============================================================
// Animation Options
// ============================================================

const animationTypes = [
  "Idle",
  "Walk",
  "Run",
  "Jump",
  "Attack",
  "Hurt",
  "Custom",
];

const frameOptions = [4, 6, 8, 10, 12, 14, 16];

const MAX_ACTION_LENGTH = 200;

// ============================================================
// Component
// ============================================================

export default function AnimationSettings() {
  // ==========================================================
  // Animation State
  // ==========================================================

  const [animationType, setAnimationType] = useState("Idle");

  const [actionDetails, setActionDetails] = useState("");

  const [frameCount, setFrameCount] = useState(8);

  // ==========================================================
  // Action Details
  // ==========================================================

  const handleActionDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setActionDetails(
      event.target.value.slice(0, MAX_ACTION_LENGTH),
    );
  };

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <aside className="w-full rounded-2xl border border-white/[0.06] bg-[#0d141f] p-5 lg:w-[300px] lg:shrink-0">
      {/* ======================================================
          Panel Header
          ====================================================== */}

      <div className="mb-7 flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#71809c]">
          Animation Settings
        </p>

        <button
          type="button"
          aria-label="Hide animation settings"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-[#71809c] transition hover:border-white/20 hover:text-white"
        >
          ×
        </button>
      </div>

      {/* ======================================================
          Animation Type
          ====================================================== */}

      <div className="mb-7">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
          Animation Type
        </p>

        <div className="grid grid-cols-2 gap-2">
          {animationTypes.map((type) => {
            const isSelected = animationType === type;

            return (
              <button
                key={type}
                type="button"
                onClick={() => setAnimationType(type)}
                className={`rounded-xl border px-3 py-3 text-sm transition ${
                  isSelected
                    ? "border-[#4d8fff] bg-[#17366d] text-white"
                    : "border-white/[0.08] bg-[#111925] text-[#8d9bb4] hover:border-white/20 hover:text-white"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
          Choose the animation you want MOTION8 to create.
        </p>
      </div>

      {/* ======================================================
          Action Details
          ====================================================== */}

      <div className="mb-7">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
            Action Details
          </p>

          <span className="text-[11px] text-[#66758f]">
            {actionDetails.length}/{MAX_ACTION_LENGTH}
          </span>
        </div>

        <p className="mb-3 text-sm text-white">
          Describe the movement.
          <span className="ml-1 text-[#66758f]">
            (optional)
          </span>
        </p>

        <textarea
          value={actionDetails}
          onChange={handleActionDetailsChange}
          maxLength={MAX_ACTION_LENGTH}
          rows={5}
          placeholder="A character gently breathing, subtle movement, natural and smooth..."
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#111925] px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-[#53627b] hover:border-white/20 focus:border-[#4d8fff]"
        />

        <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
          Describe the movement you want the animation to perform.
        </p>
      </div>

      {/* ======================================================
          Frame Count
          ====================================================== */}

      <div className="mb-7">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
            Frame Count
          </p>

          <span className="text-xs font-medium text-[#65a4ff]">
            {frameCount}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {frameOptions.map((frames) => {
            const isSelected = frameCount === frames;

            return (
              <button
                key={frames}
                type="button"
                onClick={() => setFrameCount(frames)}
                className={`rounded-xl border px-2 py-3 text-sm transition ${
                  isSelected
                    ? "border-[#4d8fff] bg-[#17366d] text-white"
                    : "border-white/[0.08] bg-[#111925] text-[#8d9bb4] hover:border-white/20 hover:text-white"
                }`}
              >
                {frames}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
          Choose how many frames MOTION8 should create.
        </p>
      </div>

      {/* ======================================================
          Future Animation Controls
          ====================================================== */}

      {/*
        Future controls such as FPS, motion intensity,
        looping and playback options will be added here.
      */}
    </aside>
  );
}