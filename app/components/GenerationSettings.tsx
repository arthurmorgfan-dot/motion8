"use client";

// ============================================================
//
// MOTION8 — Generation Settings
//
// ------------------------------------------------------------
//
// RESPONSIBILITIES:
//
// - Provides the generation settings panel for MOTION8.
// - Supports both Character and Background generation.
// - Displays controls appropriate to the active generation mode.
// - Allows the panel to be hidden and restored with one click.
//
// CHARACTER:
//
// - Static Image / Animation
// - Pixel Scale
// - Character Size
// - Sprite / Large Character categories
// - Animation
// - Frame count
// - Direction
// - Style
// - Color Palette
//
// BACKGROUND:
//
// - Static Image / Animation
// - Resolution
// - Custom Width / Height
// - Full Scene / Empty
// - Style
// - Color Palette
//
// IMPORTANT:
//
// - Character settings remain compatible with CharacterGenerator.
// - Background settings can now be controlled by
//   BackgroundGenerator through callback props.
//
// DOES NOT CONTROL:
//
// - PixelLab API communication.
// - AI generation.
// - Prompt handling.
// - Image editing.
// - Animation processing.
// - Authentication.
// - Billing.
// - Database logic.
//
// ============================================================

import { useState } from "react";

// ============================================================
// Types
// ============================================================

type GenerationSettingsProps = {
  mode: "character" | "background";

  // ==========================================================
  // Character Settings
  // ==========================================================

  pixelSize?: string;
  onPixelSizeChange?: (size: string) => void;

  animation?: string;
  onAnimationChange?: (animation: string) => void;

  frames?: number;
  onFramesChange?: (frames: number) => void;

  direction?: string;
  onDirectionChange?: (direction: string) => void;

  style?: string;
  onStyleChange?: (style: string) => void;

  colorPalette?: string;
  onColorPaletteChange?: (palette: string) => void;

  // ==========================================================
  // Background Settings
  // ==========================================================

  backgroundGenerationType?:
    | "static"
    | "animation";

  onBackgroundGenerationTypeChange?: (
    type: "static" | "animation"
  ) => void;

  backgroundResolution?: string;

  onBackgroundResolutionChange?: (
    resolution: string
  ) => void;

  customWidth?: string;

  onCustomWidthChange?: (
    width: string
  ) => void;

  customHeight?: string;

  onCustomHeightChange?: (
    height: string
  ) => void;

  backgroundType?:
    | "full"
    | "empty";

  onBackgroundTypeChange?: (
    type: "full" | "empty"
  ) => void;

  backgroundStyle?: string;

  onBackgroundStyleChange?: (
    style: string
  ) => void;

  backgroundColorPalette?: string;

  onBackgroundColorPaletteChange?: (
    palette: string
  ) => void;
};

// ============================================================
// Character Size Options
// ============================================================

const characterSpriteSizes = [
  "16 × 16",
  "32 × 32",
  "64 × 64",
  "128 × 128",
];

const characterLargeSizes = [
  "256 × 256",
  "384 × 384",
  "512 × 512",
];

const allCharacterSizes = [
  ...characterSpriteSizes,
  ...characterLargeSizes,
];

// ============================================================
// Character Settings
// ============================================================

const characterAnimations = [
  "Idle",
  "Walk",
  "Run",
  "Attack",
];

const characterFrameCounts = [
  4,
  6,
  8,
  10,
  12,
  14,
  16,
];

const characterDirections = [
  "Front",
  "Side",
  "Back",
];

const characterStyles = [
  "Classic Pixel Art",
  "Retro 8-bit",
  "Dark Fantasy",
  "Soft Pixel Art",
  "RPG Pixel Art",
];

const characterColorPalettes = [
  {
    name: "Default",
    colors: [
      "#111827",
      "#334155",
      "#475569",
      "#64748b",
      "#3b82f6",
      "#60a5fa",
      "#8b5cf6",
      "#ec4899",
    ],
  },

  {
    name: "Warm",
    colors: [
      "#2b1710",
      "#6b2d1a",
      "#a84f24",
      "#d97932",
      "#e8a83e",
      "#f2c45c",
      "#e86b4a",
      "#f3d5b5",
    ],
  },

  {
    name: "Cool",
    colors: [
      "#08111f",
      "#102a43",
      "#1d4e89",
      "#2f80c9",
      "#4da3e8",
      "#76c7f5",
      "#7c83fd",
      "#b9c7ff",
    ],
  },

  {
    name: "Monochrome",
    colors: [
      "#0a0a0a",
      "#222222",
      "#3a3a3a",
      "#555555",
      "#777777",
      "#aaaaaa",
      "#dddddd",
      "#ffffff",
    ],
  },

  {
    name: "Fantasy",
    colors: [
      "#151026",
      "#30205a",
      "#5b3c88",
      "#8f5fd1",
      "#4c8fff",
      "#6fd3c7",
      "#f0b35b",
      "#e86bb4",
    ],
  },

  {
    name: "Retro",
    colors: [
      "#1a1c2c",
      "#333c57",
      "#566c86",
      "#94b0c2",
      "#c3d9b1",
      "#f3e7b3",
      "#e8a87c",
      "#b85c5c",
    ],
  },
];

// ============================================================
// Background Settings
// ============================================================

const backgroundResolutions = [
  {
    value: "320 × 180",
    width: 320,
    height: 180,
    label: "Landscape",
  },

  {
    value: "640 × 360",
    width: 640,
    height: 360,
    label: "Landscape",
  },

  {
    value: "1280 × 720",
    width: 1280,
    height: 720,
    label: "Landscape",
  },
];

const backgroundStyles = [
  "Classic Pixel Art",
  "Retro 8-bit",
  "Detailed Pixel Art",
  "Soft Pixel Art",
  "Dark Fantasy",
];

const backgroundColorPalettes = [
  {
    name: "Default",
    colors: [
      "#111827",
      "#334155",
      "#475569",
      "#64748b",
      "#3b82f6",
      "#60a5fa",
      "#8b5cf6",
      "#ec4899",
    ],
  },

  {
    name: "Warm",
    colors: [
      "#2b1710",
      "#6b2d1a",
      "#a84f24",
      "#d97932",
      "#e8a83e",
      "#f2c45c",
      "#e86b4a",
      "#f3d5b5",
    ],
  },

  {
    name: "Cool",
    colors: [
      "#08111f",
      "#102a43",
      "#1d4e89",
      "#2f80c9",
      "#4da3e8",
      "#76c7f5",
      "#7c83fd",
      "#b9c7ff",
    ],
  },

  {
    name: "Forest",
    colors: [
      "#07150f",
      "#123524",
      "#1f5c3a",
      "#2f8050",
      "#5e9f55",
      "#8bbf67",
      "#c4d47a",
      "#e2e6a5",
    ],
  },

  {
    name: "Sunset",
    colors: [
      "#1b1025",
      "#3c1f4c",
      "#71345c",
      "#b84f5b",
      "#e86b4a",
      "#f29c5b",
      "#f5c66a",
      "#ffe0a3",
    ],
  },

  {
    name: "Monochrome",
    colors: [
      "#0a0a0a",
      "#222222",
      "#3a3a3a",
      "#555555",
      "#777777",
      "#aaaaaa",
      "#dddddd",
      "#ffffff",
    ],
  },
];

// ============================================================
// Component
// ============================================================

export default function GenerationSettings({
  mode,

  // ==========================================================
  // Character Props
  // ==========================================================

  pixelSize = "32 × 32",
  onPixelSizeChange,

  animation = "Idle",
  onAnimationChange,

  frames = 16,
  onFramesChange,

  direction = "Side",
  onDirectionChange,

  style = "Classic Pixel Art",
  onStyleChange,

  colorPalette = "Default",
  onColorPaletteChange,

  // ==========================================================
  // Background Props
  // ==========================================================

  backgroundGenerationType = "static",
  onBackgroundGenerationTypeChange,

  backgroundResolution = "320 × 180",
  onBackgroundResolutionChange,

  customWidth = "320",
  onCustomWidthChange,

  customHeight = "180",
  onCustomHeightChange,

  backgroundType = "full",
  onBackgroundTypeChange,

  backgroundStyle = "Classic Pixel Art",
  onBackgroundStyleChange,

  backgroundColorPalette = "Default",
  onBackgroundColorPaletteChange,
}: GenerationSettingsProps) {
  // ==========================================================
  // Panel State
  // ==========================================================

  const [isOpen, setIsOpen] =
    useState(true);

  // ==========================================================
  // Character State
  // ==========================================================

  const [
    generationType,
    setGenerationType,
  ] = useState<
    "static" | "animation"
  >("animation");

  const [pixelScale, setPixelScale] =
    useState("5");

  // ==========================================================
  // Character Size Dropdown
  // ==========================================================

  const [
    characterSizeMenuOpen,
    setCharacterSizeMenuOpen,
  ] = useState(false);

  // ==========================================================
  // Character Size Category
  // ==========================================================

  const characterSizeCategory =
    characterSpriteSizes.includes(
      pixelSize
    )
      ? "SPRITE"
      : "LARGE CHARACTER";

  // ==========================================================
  // Hidden Settings Panel
  // ==========================================================

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() =>
          setIsOpen(true)
        }
        aria-label="Show generation settings"
        className="fixed right-5 top-24 z-20 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0d141f] px-4 py-3 text-sm text-[#9aa8bf] shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition hover:border-[#4d8fff]/60 hover:text-white"
      >
        <span className="text-base">
          ⚙
        </span>

        <span>
          Settings
        </span>
      </button>
    );
  }

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
          Generation Settings
        </p>

        <button
          type="button"
          onClick={() =>
            setIsOpen(false)
          }
          aria-label="Hide generation settings"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-[#71809c] transition hover:border-white/20 hover:text-white"
        >
          ×
        </button>

      </div>

      {/* ======================================================
          CHARACTER SETTINGS
          ====================================================== */}

      {mode === "character" && (
        <>

          {/* ==================================================
              Generation Type
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Generation
            </p>

            <div className="relative grid grid-cols-2 gap-1 rounded-xl border border-white/[0.08] bg-[#111925] p-1">

              <div
                className={`absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-lg bg-[#4d8fff] transition-all duration-300 ease-in-out ${
                  generationType ===
                  "static"
                    ? "left-1"
                    : "left-[calc(50%+1px)]"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setGenerationType(
                    "static"
                  )
                }
                className={`relative z-10 rounded-lg px-3 py-3 text-xs font-medium transition-colors duration-300 ${
                  generationType ===
                  "static"
                    ? "text-white"
                    : "text-[#71809c] hover:text-white"
                }`}
              >
                Static Image
              </button>

              <button
                type="button"
                onClick={() =>
                  setGenerationType(
                    "animation"
                  )
                }
                className={`relative z-10 rounded-lg px-3 py-3 text-xs font-medium transition-colors duration-300 ${
                  generationType ===
                  "animation"
                    ? "text-white"
                    : "text-[#71809c] hover:text-white"
                }`}
              >
                Animation
              </button>

            </div>

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Choose whether MOTION8 creates a single image or an animation.
            </p>

          </div>

          {/* ==================================================
              Character Size
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Character Size
            </p>

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setCharacterSizeMenuOpen(
                    (current) =>
                      !current
                  )
                }
                aria-haspopup="listbox"
                aria-expanded={
                  characterSizeMenuOpen
                }
                className={`flex w-full items-center justify-between rounded-xl border bg-[#111925] px-4 py-3.5 text-left transition ${
                  characterSizeMenuOpen
                    ? "border-[#4d8fff]"
                    : "border-white/[0.08] hover:border-white/20"
                }`}
              >

                <div>

                  <span className="block text-sm font-medium text-white">
                    {pixelSize}
                  </span>

                  <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.14em] text-[#59677f]">
                    {characterSizeCategory}
                  </span>

                </div>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`text-[#71809c] transition-transform duration-200 ${
                    characterSizeMenuOpen
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  <path
                    d="M3 5L7 9L11 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </button>

              {characterSizeMenuOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-white/[0.08] bg-[#101824] shadow-[0_18px_45px_rgba(0,0,0,0.45)]">

                  {/* Sprite */}

                  <div className="px-4 pb-2 pt-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#59677f]">
                      Sprite
                    </p>
                  </div>

                  <div className="px-2 pb-2">

                    {characterSpriteSizes.map(
                      (size) => {
                        const isSelected =
                          pixelSize ===
                          size;

                        return (
                          <button
                            key={size}
                            type="button"
                            role="option"
                            aria-selected={
                              isSelected
                            }
                            onClick={() => {
                              onPixelSizeChange?.(
                                size
                              );

                              setCharacterSizeMenuOpen(
                                false
                              );
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${
                              isSelected
                                ? "bg-[#17366d] text-white"
                                : "text-[#8d9bb4] hover:bg-[#172130] hover:text-white"
                            }`}
                          >
                            <span className="text-sm">
                              {size}
                            </span>

                            {isSelected && (
                              <span className="text-xs text-[#78aaff]">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      }
                    )}

                  </div>

                  <div className="mx-3 border-t border-white/[0.06]" />

                  {/* Large Character */}

                  <div className="px-4 pb-2 pt-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#59677f]">
                      Large Character
                    </p>
                  </div>

                  <div className="px-2 pb-2">

                    {characterLargeSizes.map(
                      (size) => {
                        const isSelected =
                          pixelSize ===
                          size;

                        return (
                          <button
                            key={size}
                            type="button"
                            role="option"
                            aria-selected={
                              isSelected
                            }
                            onClick={() => {
                              onPixelSizeChange?.(
                                size
                              );

                              setCharacterSizeMenuOpen(
                                false
                              );
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${
                              isSelected
                                ? "bg-[#17366d] text-white"
                                : "text-[#8d9bb4] hover:bg-[#172130] hover:text-white"
                            }`}
                          >

                            <div>

                              <span className="block text-sm">
                                {size}
                              </span>

                              <span className="mt-0.5 block text-[9px] uppercase tracking-[0.12em] text-[#59677f]">
                                Detailed
                              </span>

                            </div>

                            {isSelected && (
                              <span className="text-xs text-[#78aaff]">
                                ✓
                              </span>
                            )}

                          </button>
                        );
                      }
                    )}

                  </div>

                </div>
              )}

            </div>

            <div className="mt-3 flex items-center justify-between">

              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#59677f]">
                {characterSizeCategory}
              </span>

              <span className="text-[11px] text-[#71809c]">
                {pixelSize}
              </span>

            </div>

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Choose between compact sprites and larger detailed character assets.
            </p>

          </div>

          {/* ==================================================
              Pixel Scale
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Pixel Scale
            </p>

            <div className="flex items-center gap-2">

              <input
                type="number"
                min="1"
                step="1"
                value={pixelScale}
                onChange={(event) => {
                  const value =
                    event.target.value;

                  if (value === "") {
                    setPixelScale("");
                    return;
                  }

                  const numericValue =
                    Number(value);

                  if (
                    Number.isInteger(
                      numericValue
                    ) &&
                    numericValue >= 1
                  ) {
                    setPixelScale(
                      String(
                        numericValue
                      )
                    );
                  }
                }}
                className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#111925] px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-[#4d8fff]"
                aria-label="Pixel scale"
              />

              <span className="shrink-0 text-xs text-[#71809c]">
                px / pixel
              </span>

            </div>

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Choose how large each pixel should be displayed.
            </p>

          </div>

          {/* ==================================================
              Animation
              ================================================== */}

          {generationType ===
            "animation" && (
            <div className="mb-7">

              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
                Animation
              </p>

              <div className="grid grid-cols-2 gap-2">

                {characterAnimations.map(
                  (animationOption) => {
                    const isSelected =
                      animation ===
                      animationOption;

                    return (
                      <button
                        key={
                          animationOption
                        }
                        type="button"
                        onClick={() =>
                          onAnimationChange?.(
                            animationOption
                          )
                        }
                        className={`rounded-xl border px-3 py-3 text-sm transition ${
                          isSelected
                            ? "border-[#4d8fff] bg-[#17366d] text-white"
                            : "border-white/[0.08] bg-[#111925] text-[#8d9bb4] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {
                          animationOption
                        }
                      </button>
                    );
                  }
                )}

              </div>

              <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
                Choose the animation you want MOTION8 to create.
              </p>

            </div>
          )}

          {/* ==================================================
              Frames
              ================================================== */}

          {generationType ===
            "animation" && (
            <div className="mb-7">

              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
                Frames
              </p>

              <div className="grid grid-cols-4 gap-2">

                {characterFrameCounts.map(
                  (frameCount) => {
                    const isSelected =
                      frames ===
                      frameCount;

                    return (
                      <button
                        key={frameCount}
                        type="button"
                        onClick={() =>
                          onFramesChange?.(
                            frameCount
                          )
                        }
                        className={`rounded-xl border px-2 py-3 text-sm transition ${
                          isSelected
                            ? "border-[#4d8fff] bg-[#17366d] text-white"
                            : "border-white/[0.08] bg-[#111925] text-[#8d9bb4] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {frameCount}
                      </button>
                    );
                  }
                )}

              </div>

              <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
                Choose how many frames MOTION8 should create.
              </p>

            </div>
          )}

          {/* ==================================================
              Direction
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Direction
            </p>

            <div className="grid grid-cols-3 gap-2">

              {characterDirections.map(
                (directionOption) => {
                  const isSelected =
                    direction ===
                    directionOption;

                  return (
                    <button
                      key={
                        directionOption
                      }
                      type="button"
                      onClick={() =>
                        onDirectionChange?.(
                          directionOption
                        )
                      }
                      className={`rounded-xl border px-2 py-3 text-xs transition ${
                        isSelected
                          ? "border-[#4d8fff] bg-[#17366d] text-white"
                          : "border-white/[0.08] bg-[#111925] text-[#8d9bb4] hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {
                        directionOption
                      }
                    </button>
                  );
                }
              )}

            </div>

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Choose which direction your character faces.
            </p>

          </div>

          {/* ==================================================
              Character Style
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Style
            </p>

            <select
              value={style}
              onChange={(event) =>
                onStyleChange?.(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-white/[0.08] bg-[#111925] px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-[#4d8fff]"
            >
              {characterStyles.map(
                (styleOption) => (
                  <option
                    key={styleOption}
                    value={styleOption}
                    className="bg-[#111925] text-white"
                  >
                    {styleOption}
                  </option>
                )
              )}
            </select>

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Choose the visual style for your character.
            </p>

          </div>

          {/* ==================================================
              Character Color Palette
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Color Palette
            </p>

            <select
              value={colorPalette}
              onChange={(event) =>
                onColorPaletteChange?.(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-white/[0.08] bg-[#111925] px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-[#4d8fff]"
            >
              {characterColorPalettes.map(
                (palette) => (
                  <option
                    key={palette.name}
                    value={palette.name}
                    className="bg-[#111925] text-white"
                  >
                    {palette.name}
                  </option>
                )
              )}
            </select>

            <div className="mt-3 flex gap-2">

              {(
                characterColorPalettes.find(
                  (palette) =>
                    palette.name ===
                    colorPalette
                ) ??
                characterColorPalettes[0]
              ).colors.map(
                (color) => (
                  <span
                    key={color}
                    className="h-5 w-5 rounded border border-white/10"
                    style={{
                      backgroundColor:
                        color,
                    }}
                  />
                )
              )}

            </div>

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Choose the color palette for your character.
            </p>

          </div>

        </>
      )}

      {/* ======================================================
          BACKGROUND SETTINGS
          ====================================================== */}

      {mode === "background" && (
        <>

          {/* ==================================================
              Generation
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Generation
            </p>

            <div className="relative grid grid-cols-2 gap-1 rounded-xl border border-white/[0.08] bg-[#111925] p-1">

              <div
                className={`absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-lg bg-[#4d8fff] transition-all duration-300 ease-in-out ${
                  backgroundGenerationType ===
                  "static"
                    ? "left-1"
                    : "left-[calc(50%+1px)]"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  onBackgroundGenerationTypeChange?.(
                    "static"
                  )
                }
                className={`relative z-10 rounded-lg px-3 py-3 text-xs font-medium transition-colors duration-300 ${
                  backgroundGenerationType ===
                  "static"
                    ? "text-white"
                    : "text-[#71809c] hover:text-white"
                }`}
              >
                Static Image
              </button>

              <button
                type="button"
                onClick={() =>
                  onBackgroundGenerationTypeChange?.(
                    "animation"
                  )
                }
                className={`relative z-10 rounded-lg px-3 py-3 text-xs font-medium transition-colors duration-300 ${
                  backgroundGenerationType ===
                  "animation"
                    ? "text-white"
                    : "text-[#71809c] hover:text-white"
                }`}
              >
                Animation
              </button>

            </div>

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Choose whether MOTION8 creates a single background or an animated scene.
            </p>

          </div>

          {/* ==================================================
              Resolution
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Resolution
            </p>

            <div className="grid grid-cols-2 gap-2">

              {backgroundResolutions.map(
                (resolution) => {
                  const isSelected =
                    backgroundResolution ===
                    resolution.value;

                  return (
                    <button
                      key={
                        resolution.value
                      }
                      type="button"
                      onClick={() =>
                        onBackgroundResolutionChange?.(
                          resolution.value
                        )
                      }
                      className={`rounded-xl border px-3 py-3 text-left transition ${
                        isSelected
                          ? "border-[#4d8fff] bg-[#17366d] text-white"
                          : "border-white/[0.08] bg-[#111925] text-[#8d9bb4] hover:border-white/20 hover:text-white"
                      }`}
                    >

                      <span className="block text-sm font-medium">
                        {
                          resolution.value
                        }
                      </span>

                      <span
                        className={`mt-1 block text-[10px] ${
                          isSelected
                            ? "text-[#78aaff]"
                            : "text-[#59677f]"
                        }`}
                      >
                        {isSelected
                          ? "Selected"
                          : resolution.label}
                      </span>

                    </button>
                  );
                }
              )}

              {/* Custom */}

              <button
                type="button"
                onClick={() =>
                  onBackgroundResolutionChange?.(
                    "Custom"
                  )
                }
                className={`rounded-xl border px-3 py-3 text-left transition ${
                  backgroundResolution ===
                  "Custom"
                    ? "border-[#4d8fff] bg-[#17366d] text-white"
                    : "border-white/[0.08] bg-[#111925] text-[#8d9bb4] hover:border-white/20 hover:text-white"
                }`}
              >

                <span className="block text-sm font-medium">
                  Custom
                </span>

                <span
                  className={`mt-1 block text-[10px] ${
                    backgroundResolution ===
                    "Custom"
                      ? "text-[#78aaff]"
                      : "text-[#59677f]"
                  }`}
                >
                  {backgroundResolution ===
                  "Custom"
                    ? "Selected"
                    : "Set your own"}
                </span>

              </button>

            </div>

            {/* ==================================================
                Custom Resolution
                ================================================== */}

            {backgroundResolution ===
              "Custom" && (
              <div className="mt-3 rounded-xl border border-white/[0.06] bg-[#101824] p-3">

                <div className="grid grid-cols-2 gap-2">

                  <div>

                    <label
                      htmlFor="background-custom-width"
                      className="mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-[#71809c]"
                    >
                      Width
                    </label>

                    <input
                      id="background-custom-width"
                      type="number"
                      min="32"
                      max="400"
                      step="1"
                      value={customWidth}
                      onChange={(event) => {
                        const value =
                          event.target
                            .value;

                        if (
                          value === "" ||
                          /^\d+$/.test(
                            value
                          )
                        ) {
                          onCustomWidthChange?.(
                            value
                          );
                        }
                      }}
                      className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#111925] px-3 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-[#4d8fff]"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="background-custom-height"
                      className="mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-[#71809c]"
                    >
                      Height
                    </label>

                    <input
                      id="background-custom-height"
                      type="number"
                      min="32"
                      max="400"
                      step="1"
                      value={customHeight}
                      onChange={(event) => {
                        const value =
                          event.target
                            .value;

                        if (
                          value === "" ||
                          /^\d+$/.test(
                            value
                          )
                        ) {
                          onCustomHeightChange?.(
                            value
                          );
                        }
                      }}
                      className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#111925] px-3 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-[#4d8fff]"
                    />

                  </div>

                </div>

                <p className="mt-3 text-[10px] leading-4 text-[#59677f]">
                  Custom dimensions currently support 32–400 px per side.
                </p>

              </div>
            )}

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Choose the canvas size for your pixel-art world.
            </p>

          </div>

          {/* ==================================================
              Background Type
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Background
            </p>

            <div className="grid grid-cols-2 gap-2">

              <button
                type="button"
                onClick={() =>
                  onBackgroundTypeChange?.(
                    "full"
                  )
                }
                className={`rounded-xl border px-3 py-3 text-sm transition ${
                  backgroundType ===
                  "full"
                    ? "border-[#4d8fff] bg-[#17366d] text-white"
                    : "border-white/[0.08] bg-[#111925] text-[#8d9bb4] hover:border-white/20 hover:text-white"
                }`}
              >
                Full Scene
              </button>

              <button
                type="button"
                onClick={() =>
                  onBackgroundTypeChange?.(
                    "empty"
                  )
                }
                className={`rounded-xl border px-3 py-3 text-sm transition ${
                  backgroundType ===
                  "empty"
                    ? "border-[#4d8fff] bg-[#17366d] text-white"
                    : "border-white/[0.08] bg-[#111925] text-[#8d9bb4] hover:border-white/20 hover:text-white"
                }`}
              >
                Empty
              </button>

            </div>

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Generate a complete environment or a simpler scene.
            </p>

          </div>

          {/* ==================================================
              Background Style
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Style
            </p>

            <select
              value={backgroundStyle}
              onChange={(event) =>
                onBackgroundStyleChange?.(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-white/[0.08] bg-[#111925] px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-[#4d8fff]"
            >
              {backgroundStyles.map(
                (styleOption) => (
                  <option
                    key={styleOption}
                    value={styleOption}
                    className="bg-[#111925] text-white"
                  >
                    {styleOption}
                  </option>
                )
              )}
            </select>

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Choose the visual style for your environment.
            </p>

          </div>

          {/* ==================================================
              Background Color Palette
              ================================================== */}

          <div className="mb-7">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8d9bb4]">
              Color Palette
            </p>

            <select
              value={
                backgroundColorPalette
              }
              onChange={(event) =>
                onBackgroundColorPaletteChange?.(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-white/[0.08] bg-[#111925] px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-[#4d8fff]"
            >
              {backgroundColorPalettes.map(
                (palette) => (
                  <option
                    key={palette.name}
                    value={palette.name}
                    className="bg-[#111925] text-white"
                  >
                    {palette.name}
                  </option>
                )
              )}
            </select>

            <div className="mt-3 flex gap-2">

              {(
                backgroundColorPalettes.find(
                  (palette) =>
                    palette.name ===
                    backgroundColorPalette
                ) ??
                backgroundColorPalettes[0]
              ).colors.map(
                (color) => (
                  <span
                    key={color}
                    className="h-5 w-5 rounded border border-white/10"
                    style={{
                      backgroundColor:
                        color,
                    }}
                  />
                )
              )}

            </div>

            <p className="mt-3 text-[11px] leading-5 text-[#59677f]">
              Choose the color palette for your environment.
            </p>

          </div>

        </>
      )}

      {/* ======================================================
          Advanced Settings
          ====================================================== */}

      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-[#111925] px-4 py-3 text-left transition hover:border-white/20"
      >
        <span className="text-sm text-[#b4c0d4]">
          Advanced Settings
        </span>

        <span className="text-sm text-[#71809c]">
          ˅
        </span>
      </button>

      {/* ======================================================
          Pro Card
          ====================================================== */}

      <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#101824] p-4">

        <div className="flex items-center gap-2">

          <span className="text-lg">
            ♛
          </span>

          <span className="text-sm font-semibold text-[#f2c96b]">
            MOTION8 PRO
          </span>

        </div>

        <p className="mt-3 text-xs leading-5 text-[#78869f]">
          Create animations, higher resolutions and more.
        </p>

        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-[#4d63d9] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#5b70e8]"
        >
          Upgrade Now
        </button>

      </div>

    </aside>
  );
}