// ============================================================
//
// MOTION8 — Generate Workspace
//
// ------------------------------------------------------------
//
// RESPONSIBILITIES:
//
// - Provides the MOTION8 Generate workspace.
// - Controls the Character / Background workspace switcher.
// - Reads the requested generator mode from the URL.
// - Animates the active workspace indicator.
// - Renders Character and Background generation.
//
// DOES NOT CONTROL:
//
// - Global navigation layout.
// - AI generation infrastructure.
// - Background generation API.
// - Image editing.
// - Animation processing.
// - Authentication.
// - Billing.
// - Database logic.
//
// ============================================================

"use client";

import { useEffect, useState } from "react";

import AppShell from "../components/AppShell";
import CharacterGenerator from "../components/CharacterGenerator";
import BackgroundGenerator from "../components/BackgroundGenerator";

type GeneratorMode = "character" | "background";

export default function GeneratePage() {
  const [mode, setMode] = useState<GeneratorMode>("character");

  {/* ==========================================================
      Read Generator Mode From URL
      ----------------------------------------------------------
      /generate?mode=character
      /generate?mode=background
      ========================================================== */}

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("mode");

    if (requestedMode === "character" || requestedMode === "background") {
      setMode(requestedMode);
    }
  }, []);

  {/* ==========================================================
      Change Generator Mode
      ----------------------------------------------------------
      Keeps the URL synchronized with the active generator.
      ========================================================== */}

  const changeMode = (nextMode: GeneratorMode) => {
    setMode(nextMode);

    const url = new URL(window.location.href);

    url.searchParams.set("mode", nextMode);

    window.history.replaceState({}, "", url.toString());
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

            {/* ==================================================
                Sliding Active Background
                ================================================== */}

            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-[#4d8fff] transition-all duration-300 ease-in-out ${
                mode === "character"
                  ? "left-1"
                  : "left-[calc(50%+1px)]"
              }`}
            />

            {/* ==================================================
                Character
                ================================================== */}

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

            {/* ==================================================
                Background
                ================================================== */}

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
            Generator
            ====================================================== */}

        {mode === "character" ? (
          <CharacterGenerator />
        ) : (
          <BackgroundGenerator />
        )}

      </div>
    </AppShell>
  );
}