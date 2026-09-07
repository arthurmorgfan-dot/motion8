"use client";

// ============================================================
// MOTION8 — Character Generator
// ------------------------------------------------------------
// RESPONSIBILITIES:
// - Provides the main MOTION8 character creation workspace.
// - Stores the user's character prompt and generation settings.
// - Stores the selected animation frame count.
// - Sends character-generation requests to the MOTION8 server.
// - Starts real PixelLab character generation.
// - Polls the generation job until the animation is complete.
// - Receives the real animation frames.
// - Displays a showcase before the first generation.
// - Displays the real generated animation after generation.
// - Provides loading, error, and completion states.
// - Provides a responsive character creation interface.
//
// DOES NOT CONTROL:
// - PixelLab API credentials.
// - PixelLab API implementation.
// - Background generation.
// - Background editing.
// - Authentication.
// - Billing.
// - Database persistence.
// ============================================================

import { useEffect, useRef, useState } from "react";

import GenerationPreview from "./GenerationPreview";
import GenerationSettings from "./GenerationSettings";

// ============================================================
// Example prompts
// ============================================================

const examples = [
  "A knight walking with a sword",
  "A wizard casting a spell",
  "A pixel-art robot running",
  "A warrior swinging a sword",
  "A small dragon flying",
];

// ============================================================
// Example showcase data
// ============================================================
//
// These are lightweight visual placeholders for the showcase.
// Later we can replace these with curated MOTION8 artwork.
// ============================================================

const showcaseItems = [
  {
    title: "KNIGHT",
    subtitle: "WALK",
    pattern: [
      "00011000",
      "00111100",
      "01111110",
      "00111100",
      "01111110",
      "11011011",
      "00011000",
      "00100100",
    ],
  },
  {
    title: "WIZARD",
    subtitle: "CAST",
    pattern: [
      "00111100",
      "01111110",
      "11111111",
      "00111100",
      "01111110",
      "11011011",
      "00111100",
      "01100110",
    ],
  },
  {
    title: "ROBOT",
    subtitle: "RUN",
    pattern: [
      "01111110",
      "11011011",
      "11111111",
      "10111101",
      "01111110",
      "00111100",
      "01100110",
      "11000011",
    ],
  },
  {
    title: "WARRIOR",
    subtitle: "ATTACK",
    pattern: [
      "00011000",
      "00111100",
      "01111110",
      "11111111",
      "00111100",
      "01100110",
      "11011011",
      "10011001",
    ],
  },
  {
    title: "DRAGON",
    subtitle: "FLY",
    pattern: [
      "00011000",
      "00111100",
      "01111110",
      "11100111",
      "01111110",
      "00111100",
      "01011010",
      "10000001",
    ],
  },
  {
    title: "ADVENTURER",
    subtitle: "IDLE",
    pattern: [
      "00111100",
      "01111110",
      "00111100",
      "01111110",
      "11011011",
      "00111100",
      "01100110",
      "11000011",
    ],
  },
];

// ============================================================
// Pixel showcase preview
// ============================================================

function PixelShowcase({
  pattern,
}: {
  pattern: string[];
}) {
  return (
    <div className="flex aspect-square items-center justify-center rounded-xl border border-white/[0.06] bg-[#0a1019]">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${pattern[0].length}, 1fr)`,
          width: "112px",
          height: "112px",
          imageRendering: "pixelated",
        }}
        aria-hidden="true"
      >
        {pattern.flatMap((row, rowIndex) =>
          row.split("").map((cell, columnIndex) => {
            const active = cell === "1";

            return (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className={
                  active
                    ? "bg-[#4d8fff]"
                    : "bg-transparent"
                }
              />
            );
          })
        )}
      </div>
    </div>
  );
}

// ============================================================
// Timing
// ============================================================

const POLL_INTERVAL = 3000;
const MAX_POLL_ATTEMPTS = 60;

// ============================================================
// Character Generator
// ============================================================

export default function CharacterGenerator() {
  const [prompt, setPrompt] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);

  const [generatedFrames, setGeneratedFrames] = useState<
    string[] | null
  >(null);

  const [error, setError] = useState("");

  // ==========================================================
  // Character generation settings
  // ==========================================================

  const [pixelSize, setPixelSize] = useState("32 × 32");
  const [animation, setAnimation] = useState("Idle");
  const [frames, setFrames] = useState(16);
  const [direction, setDirection] = useState("Side");
  const [style, setStyle] = useState("Classic Pixel Art");
  const [colorPalette, setColorPalette] =
    useState("Default");

  // ==========================================================
  // Active polling timeout
  // ==========================================================

  const pollTimeoutRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  // ==========================================================
  // Clean up polling when component disappears
  // ==========================================================

  useEffect(() => {
    return () => {
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current);
      }
    };
  }, []);

  // ==========================================================
  // Poll character generation status
  // ==========================================================

  async function pollGenerationStatus(
    jobId: string,
    attempt = 0
  ): Promise<void> {
    if (attempt >= MAX_POLL_ATTEMPTS) {
      throw new Error(
        "Character generation is taking longer than expected. Please try again."
      );
    }

    const response = await fetch(
      `/api/generate-character/status?jobId=${encodeURIComponent(
        jobId
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error ||
          "Something went wrong while checking the generation."
      );
    }

    // ========================================================
    // Generation completed
    // ========================================================

    if (data.status === "completed") {
      if (
        !Array.isArray(data.frames) ||
        data.frames.length === 0
      ) {
        throw new Error(
          "The character was generated, but no animation frames were returned."
        );
      }

      setGeneratedFrames(data.frames);
      setIsGenerating(false);

      return;
    }

    // ========================================================
    // Generation failed
    // ========================================================

    if (data.status === "failed") {
      throw new Error(
        data?.error ||
          "PixelLab could not complete the character animation."
      );
    }

    // ========================================================
    // Still processing
    // ========================================================

    pollTimeoutRef.current = setTimeout(() => {
      pollGenerationStatus(jobId, attempt + 1).catch(
        handleGenerationError
      );
    }, POLL_INTERVAL);
  }

  // ==========================================================
  // Centralized generation error handling
  // ==========================================================

  function handleGenerationError(error: unknown) {
    console.error(
      "Character generation failed:",
      error
    );

    setIsGenerating(false);

    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong while generating the character."
    );
  }

  // ==========================================================
  // Start real character generation
  // ==========================================================

  async function handleGenerate() {
    if (!prompt.trim() || isGenerating) {
      return;
    }

    // ========================================================
    // Cancel previous polling
    // ========================================================

    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }

    setIsGenerating(true);
    setGeneratedFrames(null);
    setError("");

    try {
      // ======================================================
      // Send request through our own server
      //
      // PixelLab API credentials remain server-side.
      // ======================================================

      const response = await fetch(
        "/api/generate-character",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt.trim(),
            pixelSize,
            animation,
            frames,
            direction,
            style,
            colorPalette,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Something went wrong while starting generation."
        );
      }

      if (!data.jobId) {
        throw new Error(
          "Character generation started without returning a job ID."
        );
      }

      // ======================================================
      // PixelLab is generating the animation.
      // ======================================================

      await pollGenerationStatus(data.jobId);
    } catch (error) {
      handleGenerationError(error);
    }
  }

  // ==========================================================
  // Example prompt
  // ==========================================================

  function handleExampleClick(example: string) {
    setPrompt(example);
    setError("");
  }

  // ==========================================================
  // Generation settings
  // ==========================================================

  function handlePixelSizeChange(size: string) {
    setPixelSize(size);
  }

  function handleAnimationChange(
    selectedAnimation: string
  ) {
    setAnimation(selectedAnimation);
  }

  function handleFramesChange(selectedFrames: number) {
    setFrames(selectedFrames);
  }

  function handleDirectionChange(
    selectedDirection: string
  ) {
    setDirection(selectedDirection);
  }

  function handleStyleChange(selectedStyle: string) {
    setStyle(selectedStyle);
  }

  function handleColorPaletteChange(
    selectedPalette: string
  ) {
    setColorPalette(selectedPalette);
  }

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1400px]">

        <div className="flex flex-col gap-8 xl:flex-row xl:items-start">

          {/* ==================================================
              Main Workspace
              ================================================== */}

          <div className="min-w-0 flex-1">

            {/* ==================================================
                Character Generator Header
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
                Describe your character and animation, and let
                MOTION8 bring it to life.
              </p>
            </div>

            {/* ==================================================
                Prompt Generator
                ================================================== */}

            <div className="rounded-2xl border border-white/[0.08] bg-[#0d141f] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-5">

              <div className="flex flex-col gap-4 lg:flex-row">

                {/* Prompt */}

                <div className="relative min-h-[150px] flex-1 rounded-xl border border-[#334158] bg-[#111925] transition focus-within:border-[#4d8fff]">

                  <textarea
                    value={prompt}
                    onChange={(event) =>
                      setPrompt(event.target.value)
                    }
                    placeholder="Describe the character and animation you want..."
                    maxLength={500}
                    disabled={isGenerating}
                    className="min-h-[150px] w-full resize-none bg-transparent px-5 py-5 pb-10 text-base text-white outline-none placeholder:text-[#4f5d73]"
                  />

                  <span className="absolute bottom-3 right-4 text-[10px] text-[#526078]">
                    {prompt.length}/500
                  </span>
                </div>

                {/* Generate Button */}

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={
                    isGenerating || !prompt.trim()
                  }
                  className="flex min-h-[150px] items-center justify-center gap-3 rounded-xl bg-[#4d8fff] px-8 text-base font-semibold text-white transition hover:bg-[#609cff] disabled:cursor-not-allowed disabled:opacity-40 lg:w-[185px]"
                >
                  <span className="text-xl">
                    {isGenerating ? "◌" : "✦"}
                  </span>

                  <span>
                    {isGenerating
                      ? "Creating..."
                      : "Generate"}
                  </span>
                </button>
              </div>

              {/* =================================================
                  Example Prompts
                  ================================================= */}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs text-[#65738b]">
                  Try an example:
                </span>

                {examples.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() =>
                      handleExampleClick(example)
                    }
                    disabled={isGenerating}
                    className="rounded-lg border border-white/[0.08] bg-[#101824] px-3 py-2 text-[11px] text-[#9aa8bf] transition hover:border-[#4d8fff]/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {example}
                  </button>
                ))}
              </div>

              {/* =================================================
                  Generation Status
                  ================================================= */}

              {isGenerating && (
                <p className="mt-4 text-xs text-[#71809c]">
                  Creating your{" "}
                  {style.toLowerCase()}{" "}
                  {colorPalette.toLowerCase()}{" "}
                  {animation.toLowerCase()} animation with{" "}
                  {frames} frames at {pixelSize}, facing{" "}
                  {direction.toLowerCase()}...
                </p>
              )}

              {/* =================================================
                  Generation Error
                  ================================================= */}

              {error && (
                <div className="mt-4 rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3">
                  <p className="text-xs leading-5 text-red-300">
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* ==================================================
                Workspace Showcase / Generated Result
                ================================================== */}

            <div className="mt-8">

              {generatedFrames ? (

                /* ==================================================
                   REAL GENERATED CHARACTER
                   ================================================== */

                <div>
                  <div className="mb-4 flex items-end justify-between">

                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#71809c]">
                        Your Generation
                      </p>

                      <h2 className="mt-2 text-xl font-semibold text-white">
                        Character animation
                      </h2>
                    </div>

                    <span className="text-[11px] text-[#59677f]">
                      {generatedFrames.length} frames
                    </span>
                  </div>

                  <GenerationPreview
                    frames={generatedFrames}
                    pixelSize={pixelSize}
                  />
                </div>

              ) : (

                /* ==================================================
                   EXAMPLE GENERATIONS
                   ================================================== */

                <div className="rounded-2xl border border-white/[0.08] bg-[#0d141f] p-5 sm:p-6">

                  <div className="mb-6 flex items-end justify-between gap-4">

                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#71809c]">
                        Example Generations
                      </p>

                      <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                        See what MOTION8 can create
                      </h2>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#66758e]">
                        Start with an idea, choose your settings,
                        and turn it into pixel art.
                      </p>
                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                    {showcaseItems.map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() =>
                          handleExampleClick(
                            examples[
                              showcaseItems.indexOf(item) %
                                examples.length
                            ]
                          )
                        }
                        disabled={isGenerating}
                        className="group rounded-xl border border-white/[0.06] bg-[#101824] p-2 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#4d8fff]/40 hover:bg-[#121d2b] disabled:pointer-events-none disabled:opacity-50"
                      >

                        <PixelShowcase
                          pattern={item.pattern}
                        />

                        <div className="px-2 pb-2 pt-3">

                          <div className="flex items-center justify-between">

                            <p className="text-[11px] font-semibold tracking-[0.14em] text-white">
                              {item.title}
                            </p>

                            <span className="text-[10px] text-[#4d8fff] opacity-0 transition group-hover:opacity-100">
                              →
                            </span>

                          </div>

                          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#59677f]">
                            {item.subtitle}
                          </p>

                        </div>
                      </button>
                    ))}

                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ====================================================
              Character Generation Settings
              ==================================================== */}

          <GenerationSettings
            mode="character"
            pixelSize={pixelSize}
            onPixelSizeChange={handlePixelSizeChange}
            animation={animation}
            onAnimationChange={handleAnimationChange}
            frames={frames}
            onFramesChange={handleFramesChange}
            direction={direction}
            onDirectionChange={handleDirectionChange}
            style={style}
            onStyleChange={handleStyleChange}
            colorPalette={colorPalette}
            onColorPaletteChange={
              handleColorPaletteChange
            }
          />

        </div>
      </div>
    </section>
  );
}