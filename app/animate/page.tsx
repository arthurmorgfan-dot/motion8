// ============================================================
//
// MOTION8 — Animate Workspace
//
// ------------------------------------------------------------
//
// RESPONSIBILITIES:
//
// - Provides the main Animate workspace.
// - Controls the Character / Background animation switcher.
// - Allows users to upload a static image.
// - Supports drag-and-drop image uploading.
// - Supports selecting an image through the file picker.
// - Displays the selected image inside the workspace.
// - Connects the Animation Settings component.
// - Matches the visual structure of the Generate workspace.
//
// DOES NOT CONTROL:
//
// - AI animation generation.
// - Animation processing.
// - Frame editing.
// - Timeline logic.
// - Animation generation API.
// - Exporting.
// - Authentication.
// - Billing.
// - Database logic.
//
// ============================================================

"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useState,
} from "react";

import AppShell from "../components/AppShell";
import AnimationSettings from "../components/AnimationSettings";

type AnimationMode = "character" | "background";

export default function AnimatePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] =
    useState<AnimationMode>("character");

  // ==========================================================
  // Clean up image object URL
  // ==========================================================

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // ==========================================================
  // Handle selected image
  // ==========================================================

  const handleImage = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const nextImageUrl = URL.createObjectURL(file);

    setImageUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      return nextImageUrl;
    });
  };

  // ==========================================================
  // File picker
  // ==========================================================

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      handleImage(file);
    }

    event.target.value = "";
  };

  // ==========================================================
  // Drag and drop
  // ==========================================================

  const handleDragOver = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    if (event.currentTarget === event.target) {
      setIsDragging(false);
    }
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleImage(file);
    }
  };

  // ==========================================================
  // Animation mode
  // ==========================================================

  const changeMode = (nextMode: AnimationMode) => {
    setMode(nextMode);
  };

  return (
    <AppShell>
      <div className="min-h-screen">

        {/* ======================================================
            Workspace Header
            ====================================================== */}

        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5 sm:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#71809c]">
              MOTION8 Workspace
            </p>

            <p className="mt-1 text-sm text-[#9aa8c0]">
              Create something new.
            </p>
          </div>

          {/* ==================================================
              Character / Background Switcher
              ================================================== */}

          <div className="relative flex items-center rounded-xl border border-white/[0.06] bg-[#0b111c] p-1">

            {/* Sliding active background */}

            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-[#4d8fff] transition-all duration-300 ease-in-out ${
                mode === "character"
                  ? "left-1"
                  : "left-[calc(50%+1px)]"
              }`}
            />

            {/* Character */}

            <button
              type="button"
              onClick={() => changeMode("character")}
              className={`relative z-10 rounded-lg px-4 py-2 text-sm transition-colors duration-300 ${
                mode === "character"
                  ? "text-white"
                  : "text-[#71809c] hover:text-white"
              }`}
            >
              Character
            </button>

            {/* Background */}

            <button
              type="button"
              onClick={() => changeMode("background")}
              className={`relative z-10 rounded-lg px-4 py-2 text-sm transition-colors duration-300 ${
                mode === "background"
                  ? "text-white"
                  : "text-[#71809c] hover:text-white"
              }`}
            >
              Background
            </button>
          </div>
        </div>

        {/* ======================================================
            Animate Workspace
            ====================================================== */}

        <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div className="mx-auto w-full max-w-[1400px]">

            <div className="flex flex-col gap-8 xl:flex-row xl:items-start">

              {/* ==================================================
                  Main Workspace
                  ================================================== */}

              <div className="contents xl:block xl:flex-1 min-w-0">

                {/* ==================================================
                    Animate Header
                    ================================================== */}

                <div className="mb-8">
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#71809c]">
                    Pixel Character Animator
                  </p>

                  <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                    Bring characters
                    <br />
                    <span className="text-[#4d8fff]">
                      to life
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-6 text-[#8492aa] sm:text-base">
                    Turn a static pixel character into animation
                    with complete creative control.
                  </p>
                </div>

                {/* ==================================================
                    Upload Workspace
                    ================================================== */}

                <div className="rounded-2xl border border-white/[0.08] bg-[#0d141f] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-5">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-xl border transition ${
                      isDragging
                        ? "border-[#65a4ff] bg-[#0d1a2c] shadow-[0_0_40px_rgba(77,143,255,0.14)]"
                        : "border-white/[0.06] bg-[#080d16]"
                    }`}
                  >
                    {imageUrl ? (
                      <div className="flex h-full w-full items-center justify-center p-6 sm:p-10">
                        <img
                          src={imageUrl}
                          alt="Selected pixel art"
                          className="max-h-[420px] max-w-full object-contain [image-rendering:pixelated]"
                        />

                        {isDragging && (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#080d16]/80 backdrop-blur-[2px]">
                            <div className="rounded-xl border border-[#65a4ff]/40 bg-[#0e1b2e] px-6 py-4 text-center shadow-[0_0_40px_rgba(77,143,255,0.18)]">
                              <p className="text-sm font-semibold text-white">
                                Drop to replace image
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="px-6 text-center">

                        <div
                          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border transition ${
                            isDragging
                              ? "border-[#65a4ff] bg-[#12213a] text-[#65a4ff]"
                              : "border-[#243653] bg-[#101b2c] text-[#65a4ff]"
                          }`}
                        >
                          <span className="text-3xl">
                            ◇
                          </span>
                        </div>

                        <p className="mt-6 text-lg font-semibold text-white">
                          {isDragging
                            ? "Drop your image here."
                            : "Bring your pixel art here."}
                        </p>

                        <p className="mt-2 text-sm text-[#66758f]">
                          Drag and drop an image into this area
                        </p>

                        <div className="mt-6">
                          <label className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg bg-[#4d8fff] px-5 text-sm font-semibold text-white transition hover:bg-[#609cff]">
                            Choose Image

                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <p className="mt-4 text-[11px] text-[#4f5e76]">
                          PNG, JPG, WEBP and other image formats
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ==================================================
                    Example Animations
                    ================================================== */}

                <div className="order-2 mt-8 rounded-2xl border border-white/[0.08] bg-[#0d141f] p-5 sm:p-6 xl:order-none">

                  <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#71809c]">
                        Example Animations
                      </p>

                      <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                        Explore animation ideas
                      </h2>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#66758e]">
                        Choose an example to see how your pixel art
                        could move.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      "Idle",
                      "Walk",
                      "Run",
                      "Jump",
                      "Attack",
                      "Hurt",
                    ].map((animation) => (
                      <button
                        key={animation}
                        type="button"
                        className="group rounded-xl border border-white/[0.06] bg-[#101824] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#4d8fff]/40 hover:bg-[#121d2b]"
                      >
                        <div className="flex aspect-square items-center justify-center rounded-xl border border-white/[0.06] bg-[#0a1019]">
                          <span className="text-2xl text-[#4d8fff]">
                            ◇
                          </span>
                        </div>

                        <div className="px-1 pb-1 pt-3">
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-semibold tracking-[0.14em] text-white">
                              {animation.toUpperCase()}
                            </p>

                            <span className="text-[10px] text-[#4d8fff] opacity-0 transition group-hover:opacity-100">
                              →
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ==================================================
                  Animation Settings
                  ================================================== */}

              <div className="order-1 xl:order-none">
                {mode === "character" ? (
                  <AnimationSettings />
                ) : (
                  <aside className="w-full rounded-2xl border border-white/[0.06] bg-[#0d141f] p-5 lg:w-[300px] lg:shrink-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#71809c]">
                      Animation Settings
                    </p>

                    <div className="mt-8 rounded-xl border border-white/[0.06] bg-[#111925] p-5">
                      <p className="text-sm font-medium text-white">
                        Background animation
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[#66758f]">
                        Background animation controls are coming next.
                      </p>
                    </div>
                  </aside>
                )}
              </div>

            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}