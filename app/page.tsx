// ============================================================
// MOTION8 — Main Application Page
// ------------------------------------------------------------
// RESPONSIBILITIES:
// - Mounts the global MOTION8 application shell.
// - Provides the current creation workspace.
// - Controls the Character / Background workspace switcher.
// - Animates the active workspace indicator between modes.
// - Keeps Character and Background generation available.
//
// DOES NOT CONTROL:
// - Global navigation layout.
// - AI generation infrastructure.
// - Background generation API.
// - Image editing.
// - Authentication.
// - Billing.
// - Database logic.
// ============================================================

"use client";

import { useState } from "react";

import AppShell from "./components/AppShell";
import CharacterGenerator from "./components/CharacterGenerator";
import BackgroundGenerator from "./components/BackgroundGenerator";

type GeneratorMode = "character" | "background";

export default function Home() {
  const [mode, setMode] = useState<GeneratorMode>("character");

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
              --------------------------------------------------
              The blue active indicator is positioned behind
              the buttons and smoothly slides between them.
              ================================================== */}

          <div className="relative flex items-center rounded-xl border border-white/[0.06] bg-[#0b111c] p-1">
            {/* ------------------------------------------------
                Sliding active background
                ------------------------------------------------ */}

            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-[#4d8fff] transition-all duration-300 ease-in-out ${
                mode === "character"
                  ? "left-1"
                  : "left-[calc(50%+1px)]"
              }`}
            />

            {/* ------------------------------------------------
                Character
                ------------------------------------------------ */}

            <button
              type="button"
              onClick={() => setMode("character")}
              className={`relative z-10 rounded-lg px-4 py-2 text-sm transition-colors duration-300 ${
                mode === "character"
                  ? "text-white"
                  : "text-[#71809c] hover:text-white"
              }`}
            >
              Character
            </button>

            {/* ------------------------------------------------
                Background
                ------------------------------------------------ */}

            <button
              type="button"
              onClick={() => setMode("background")}
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