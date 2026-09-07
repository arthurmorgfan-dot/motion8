// ============================================================
//
// MOTION8 — Application Shell
//
// ------------------------------------------------------------
//
// RESPONSIBILITIES:
//
// - Provides the global MOTION8 application layout.
// - Renders the desktop sidebar navigation.
// - Renders the mobile top navigation.
// - Provides the mobile navigation drawer.
// - Provides a temporary non-React mobile interaction test.
// - Provides the main application workspace.
//
// DOES NOT CONTROL:
//
// - AI generation.
// - Background generation.
// - Character generation.
// - Image editing.
// - Animation processing.
// - Authentication.
// - Billing.
// - Database logic.
//
// ============================================================

"use client";

import { ReactNode, useState } from "react";

type AppShellProps = {
  children: ReactNode;
};

const navigation = [
  {
    name: "Generate",
    icon: "✦",
  },
  {
    name: "Animate",
    icon: "◇",
  },
  {
    name: "Projects",
    icon: "□",
  },
  {
    name: "Gallery",
    icon: "▧",
  },
  {
    name: "Settings",
    icon: "⚙",
  },
];

export default function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080d16] text-white">
      {/* ======================================================
          Desktop Sidebar
          ====================================================== */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] border-r border-white/[0.06] bg-[#0b111c] lg:flex lg:flex-col">
        {/* Logo */}

        <div className="px-10 pt-8">
          <div className="text-[30px] font-black tracking-[-0.04em]">
            MOTION8
          </div>

          <p className="mt-1 text-[11px] tracking-[0.28em] text-[#71809c]">
            IDEAS IN MOTION
          </p>
        </div>

        {/* Navigation */}

        <nav className="mt-12 px-4">
          <div className="space-y-2">
            {navigation.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={`group flex min-h-[52px] w-full items-center gap-4 rounded-lg px-6 py-3.5 text-left transition ${
                  index === 0
                    ? "bg-[#17366d] text-[#65a4ff] shadow-[inset_4px_0_0_#4d8fff]"
                    : "text-[#8190ad] hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <span className="flex w-5 justify-center text-xl leading-none">
                  {item.icon}
                </span>

                <span className="text-[15px] font-medium">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}

        <div className="mt-auto px-4 pb-6">
          <div className="rounded-xl border border-white/[0.06] bg-[#0e1623] p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8190ad]">
              Create
            </p>

            <p className="mt-2 text-[11px] leading-6 tracking-[0.18em] text-[#60708e]">
              ANIMATE
              <br />
              EXPAND
              <br />
              BUILD
            </p>

            <div className="mt-5 h-px w-8 bg-[#4d8fff]" />

            <p className="mt-5 text-[11px] leading-5 tracking-[0.16em] text-[#60708e]">
              PIXEL ART
              <br />
              FOR A BIGGER
              <br />
              TOMORROW.
            </p>
          </div>
        </div>
      </aside>

      {/* ======================================================
          Mobile Header
          ====================================================== */}

      <header className="relative z-40 flex h-20 items-center justify-between border-b border-white/[0.06] bg-[#0b111c] px-5 lg:hidden">
        <div>
          <div className="text-2xl font-black tracking-[-0.04em]">
            MOTION8
          </div>

          <p className="text-[8px] tracking-[0.25em] text-[#71809c]">
            IDEAS IN MOTION
          </p>
        </div>

        {/* ==================================================
            TEMPORARY NON-REACT TEST
            ================================================== */}

        <a
          href="#motion8-mobile-test"
          className="flex h-12 min-w-[72px] items-center justify-center rounded-lg border-2 border-white bg-white px-4 text-sm font-bold text-black"
        >
          TEST
        </a>
      </header>

      {/* ======================================================
          Mobile Navigation Drawer
          ====================================================== */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}

          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/70"
          />

          {/* Drawer */}

          <aside className="relative z-[101] flex h-full w-[min(84vw,340px)] flex-col border-r border-white/[0.08] bg-[#0b111c] shadow-[20px_0_60px_rgba(0,0,0,0.5)]">
            {/* Drawer Header */}

            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-6">
              <div>
                <div className="text-2xl font-black tracking-[-0.04em]">
                  MOTION8
                </div>

                <p className="mt-1 text-[8px] tracking-[0.25em] text-[#71809c]">
                  IDEAS IN MOTION
                </p>
              </div>

              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#34445f] bg-[#0e1623] text-xl text-[#dce7ff]"
              >
                ×
              </button>
            </div>

            {/* Drawer Navigation */}

            <nav className="px-4 py-6">
              <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#59677f]">
                Workspace
              </p>

              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-[56px] w-full items-center gap-4 rounded-xl px-5 text-left ${
                      index === 0
                        ? "bg-[#17366d] text-[#65a4ff] shadow-[inset_4px_0_0_#4d8fff]"
                        : "text-[#8190ad]"
                    }`}
                  >
                    <span className="flex w-6 justify-center text-xl leading-none">
                      {item.icon}
                    </span>

                    <span className="text-[15px] font-medium">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Drawer Footer */}

            <div className="mt-auto px-4 pb-6">
              <div className="rounded-xl border border-white/[0.06] bg-[#0e1623] p-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8190ad]">
                  Create
                </p>

                <p className="mt-2 text-[10px] leading-6 tracking-[0.18em] text-[#60708e]">
                  ANIMATE
                  <br />
                  EXPAND
                  <br />
                  BUILD
                </p>

                <div className="mt-4 h-px w-8 bg-[#4d8fff]" />

                <p className="mt-4 text-[10px] leading-5 tracking-[0.16em] text-[#60708e]">
                  PIXEL ART
                  <br />
                  FOR A BIGGER
                  <br />
                  TOMORROW.
                </p>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ======================================================
          Main Workspace
          ====================================================== */}

      <main className="relative z-0 min-h-screen lg:ml-[280px]">
        {children}
      </main>
    </div>
  );
}