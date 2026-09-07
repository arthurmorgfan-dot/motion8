"use client";

// ============================================================
//
// MOTION8 — Background Generator
//
// ============================================================
//
// RESPONSIBILITIES:
//
// - Provides the main MOTION8 background creation workspace.
// - Stores the user's background prompt.
// - Stores the user's background generation settings.
// - Sends background-generation requests to the MOTION8 server.
// - Controls the generation/loading state.
// - Stores the generated background returned by the server.
// - Displays example background generations before generation.
// - Displays the real generated background after generation.
// - Switches the generated result between Preview and Editor.
// - Provides a responsive background creation interface.
//
// DOES NOT CONTROL:
//
// - PixelLab API credentials.
// - PixelLab API implementation.
// - Character generation.
// - Character animation.
// - Frame timelines.
// - Background editing tools.
// - Export processing.
// - Authentication.
// - Billing.
// - Database persistence.
//
// ============================================================

import { useState } from "react";
import BackgroundPreview from "./BackgroundPreview";
import BackgroundEditor from "./BackgroundEditor";
import GenerationSettings from "./GenerationSettings";

// ============================================================
// Background View
// ============================================================

type BackgroundView = "preview" | "editor";

// ============================================================
// Example Prompts
// ============================================================

const examples = [
  "A mysterious forest at night",
  "A medieval village at sunrise",
  "A dark underground dungeon",
  "A peaceful pixel-art island",
  "A futuristic cyberpunk street",
];

// ============================================================
// Example Showcase Data
// ============================================================

const showcaseItems = [
  {
    title: "FOREST",
    subtitle: "NIGHT",
    scene: "forest",
  },
  {
    title: "CASTLE",
    subtitle: "SUNRISE",
    scene: "castle",
  },
  {
    title: "VILLAGE",
    subtitle: "DAY",
    scene: "village",
  },
  {
    title: "DUNGEON",
    subtitle: "DARK",
    scene: "dungeon",
  },
  {
    title: "CYBERPUNK",
    subtitle: "STREET",
    scene: "cyberpunk",
  },
  {
    title: "BATTLEFIELD",
    subtitle: "EPIC",
    scene: "battlefield",
  },
];

// ============================================================
// Pixel Background Showcase
// ============================================================

function PixelBackgroundShowcase({
  scene,
}: {
  scene: string;
}) {
  const scenePatterns: Record<string, string[]> = {
    forest: [
      "000000000000000000000000",
      "000000000000000000000000",
      "000001110000000011100000",
      "000011111000000111110000",
      "000111111100001111111000",
      "001111111110011111111100",
      "011111111111111111111110",
      "000011110000000011110000",
      "000011110000000011110000",
      "000011110000000011110000",
      "001111111000001111111000",
      "111111111111111111111111",
    ],

    castle: [
      "000000000000000000000000",
      "000000110000000011000000",
      "000000110000000011000000",
      "000001111000001111000000",
      "000001111000001111000000",
      "000001111111111111000000",
      "000011111111111111100000",
      "000011111111111111100000",
      "000011110000001111100000",
      "000011110000001111100000",
      "000111111000011111110000",
      "111111111111111111111111",
    ],

    village: [
      "000000000000000000000000",
      "000000000000000000000000",
      "000000000111000000000000",
      "000000001111100000000000",
      "000000011111110000000000",
      "000000111111111000000000",
      "000001111111111100000000",
      "000001111000111100000000",
      "000011111000111110000000",
      "000011111000111110000000",
      "001111111000111111100000",
      "111111111111111111111111",
    ],

    dungeon: [
      "111111111111111111111111",
      "111100001111111100001111",
      "111100001111111100001111",
      "111111111111111111111111",
      "111111100000000111111111",
      "111111000000000011111111",
      "111110000000000001111111",
      "111100000011000000111111",
      "111100000011000000111111",
      "111111000000001111111111",
      "111111111111111111111111",
      "222222222222222222222222",
    ],

    cyberpunk: [
      "333333333333333333333333",
      "333300003333333300003333",
      "333300003333333300003333",
      "333333333333333333333333",
      "333300003333000033330333",
      "333300003333000033330333",
      "333333333333333333333333",
      "333000033330000333300033",
      "333000033330000333300033",
      "333333333333333333333333",
      "333333333333333333333333",
      "222222222222222222222222",
    ],

    battlefield: [
      "000000000000000000000000",
      "000000000000000000000000",
      "000000011000000000011000",
      "000000111100000001111000",
      "000001111110000011111100",
      "000000011000000000011000",
      "000000011000000000011000",
      "000011111111001111111100",
      "000111111111111111111110",
      "001111111111111111111111",
      "111111111111111111111111",
      "222222222222222222222222",
    ],
  };

  const pattern =
    scenePatterns[scene] ?? scenePatterns.forest;

  return (
    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a1019]">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${pattern[0].length}, 1fr)`,
          width: "100%",
          height: "50%",
          imageRendering: "pixelated",
        }}
        aria-hidden="true"
      >
        {pattern.flatMap((row, rowIndex) =>
          row.split("").map((cell, columnIndex) => {
            let background = "transparent";

            if (cell === "1") {
              background = "#284a75";
            }

            if (cell === "2") {
              background = "#1d3048";
            }

            if (cell === "3") {
              background = "#365f8f";
            }

            return (
              <div
                key={`${rowIndex}-${columnIndex}`}
                style={{
                  background,
                }}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

// ============================================================
// Background Generator
// ============================================================

export default function BackgroundGenerator() {
  const [prompt, setPrompt] = useState("");

  const [generating, setGenerating] =
    useState(false);

  const [generatedImage, setGeneratedImage] =
    useState<string | null>(null);

  const [error, setError] = useState("");

  const [view, setView] =
    useState<BackgroundView>("preview");

  // ==========================================================
  // Background Generation Settings
  // ==========================================================

  const [
    backgroundGenerationType,
    setBackgroundGenerationType,
  ] = useState<"static" | "animation">("static");

  const [
    backgroundResolution,
    setBackgroundResolution,
  ] = useState("320 × 180");

  const [customWidth, setCustomWidth] =
    useState("320");

  const [customHeight, setCustomHeight] =
    useState("180");

  const [backgroundType, setBackgroundType] =
    useState<"full" | "empty">("full");

  const [backgroundStyle, setBackgroundStyle] =
    useState("Classic Pixel Art");

  const [
    backgroundColorPalette,
    setBackgroundColorPalette,
  ] = useState("Default");

  // ==========================================================
  // Start Background Generation
  // ==========================================================

  async function handleGenerate() {
    if (!prompt.trim() || generating) {
      return;
    }

    // --------------------------------------------------------
    // Background animation is intentionally not connected yet.
    // The current PixelLab route generates a single image.
    // --------------------------------------------------------

    if (backgroundGenerationType === "animation") {
      setError(
        "Background animation is coming next. Please select Static Image for now.",
      );

      return;
    }

    setGenerating(true);
    setGeneratedImage(null);
    setError("");
    setView("preview");

    try {
      const response = await fetch(
        "/api/generate-background",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt.trim(),
            backgroundGenerationType,
            backgroundResolution,
            customWidth,
            customHeight,
            backgroundType,
            backgroundStyle,
            backgroundColorPalette,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Something went wrong while generating.",
        );
      }

      if (!data.image) {
        throw new Error(
          "PixelLab returned no image.",
        );
      }

      setGeneratedImage(data.image);
    } catch (error) {
      console.error(
        "Background generation failed:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating.",
      );
    } finally {
      setGenerating(false);
    }
  }

  // ==========================================================
  // Edit Generated Background
  // ==========================================================

  function handleEdit() {
    setView("editor");
  }

  // ==========================================================
  // Return To Preview
  // ==========================================================

  function handleBackToPreview() {
    setView("preview");
  }

  // ==========================================================
  // Example Prompt
  // ==========================================================

  function handleExampleClick(
    example: string,
  ) {
    setPrompt(example);
    setError("");
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
                Background Generator Header
                ================================================== */}

            <div className="mb-8">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#71809c]">
                Pixel Art Generator
              </p>

              <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Create worlds
                <br />
                <span className="text-[#4d8fff]">
                  from your ideas.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#8492aa] sm:text-base">
                Describe the pixel-art environment you want
                to create and let MOTION8 bring it to life.
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
                    placeholder="Describe the world you want to create..."
                    maxLength={500}
                    disabled={generating}
                    className="min-h-[150px] w-full resize-none bg-transparent px-5 py-5 pb-10 text-base text-white outline-none placeholder:text-[#4f5d73]"
                  />

                  <span className="absolute bottom-3 right-4 text-[10px] text-[#526078]">
                    {prompt.length}/500
                  </span>
                </div>

                {/* ==================================================
                    GENERATE BUTTON — MOBILE DIAGNOSTIC
                    ================================================== */}

                <button
  type="button"
  onClick={handleGenerate}
  disabled={generating || !prompt.trim()}
  className="flex min-h-[150px] items-center justify-center gap-3 rounded-xl bg-[#4d8fff] px-8 text-base font-semibold text-white transition hover:bg-[#609cff] disabled:cursor-not-allowed disabled:opacity-40 lg:w-[185px]"
>
  <span className="text-xl">
    {generating ? "◌" : "✦"}
  </span>

  <span>
    {generating ? "Creating..." : "Generate"}
  </span>
</button>

              </div>

              {/* ==================================================
                  Example Prompts
                  ================================================== */}

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
                    disabled={generating}
                    className="rounded-lg border border-white/[0.08] bg-[#101824] px-3 py-2 text-[11px] text-[#9aa8bf] transition hover:border-[#4d8fff]/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {example}
                  </button>
                ))}
              </div>

              {/* ==================================================
                  Generation Status
                  ================================================== */}

              {generating && (
                <p className="mt-4 text-xs text-[#71809c]">
                  Creating your pixel-art background...
                </p>
              )}

              {/* ==================================================
                  Generation Error
                  ================================================== */}

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

              {generatedImage ? (

                /* ==================================================
                   REAL GENERATED BACKGROUND
                   ================================================== */

                <div>
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#71809c]">
                        Your Generation
                      </p>

                      <h2 className="mt-2 text-xl font-semibold text-white">
                        Background environment
                      </h2>
                    </div>

                    <span className="text-[11px] text-[#59677f]">
                      Generated
                    </span>
                  </div>

                  {view === "preview" && (
                    <BackgroundPreview
                      imageSrc={generatedImage}
                      onEdit={handleEdit}
                    />
                  )}

                  {view === "editor" && (
                    <BackgroundEditor
                      imageSrc={generatedImage}
                      onBack={handleBackToPreview}
                    />
                  )}
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

                  {/* ==================================================
                      Background Showcase Grid
                      ================================================== */}

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {showcaseItems.map(
                      (item, index) => (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() =>
                            handleExampleClick(
                              examples[
                                index %
                                  examples.length
                              ],
                            )
                          }
                          disabled={generating}
                          className="group rounded-xl border border-white/[0.06] bg-[#101824] p-2 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#4d8fff]/40 hover:bg-[#121d2b] disabled:pointer-events-none disabled:opacity-50"
                        >
                          <PixelBackgroundShowcase
                            scene={item.scene}
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
                      ),
                    )}
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* ====================================================
              Background Generation Settings
              ==================================================== */}

          {view === "preview" && (
            <GenerationSettings
              mode="background"

              backgroundGenerationType={
                backgroundGenerationType
              }

              onBackgroundGenerationTypeChange={
                setBackgroundGenerationType
              }

              backgroundResolution={
                backgroundResolution
              }

              onBackgroundResolutionChange={
                setBackgroundResolution
              }

              customWidth={customWidth}

              onCustomWidthChange={
                setCustomWidth
              }

              customHeight={customHeight}

              onCustomHeightChange={
                setCustomHeight
              }

              backgroundType={
                backgroundType
              }

              onBackgroundTypeChange={
                setBackgroundType
              }

              backgroundStyle={
                backgroundStyle
              }

              onBackgroundStyleChange={
                setBackgroundStyle
              }

              backgroundColorPalette={
                backgroundColorPalette
              }

              onBackgroundColorPaletteChange={
                setBackgroundColorPalette
              }
            />
          )}

        </div>
      </div>
    </section>
  );
}