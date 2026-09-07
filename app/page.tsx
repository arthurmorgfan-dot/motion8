// ============================================================
//
// MOTION8 — Home Page
//
// ------------------------------------------------------------
//
// RESPONSIBILITIES:
//
// - Provides the MOTION8 home experience.
// - Presents the primary product message.
// - Introduces the pixel-art creation workflow.
// - Provides entry points into the correct Generate workspace.
// - Showcases Character and Background creation visually.
//
// DOES NOT CONTROL:
//
// - Global navigation layout.
// - AI generation infrastructure.
// - Character generation.
// - Background generation.
// - Animation processing.
// - Image editing.
// - Authentication.
// - Billing.
// - Database logic.
//
// ============================================================

import Link from "next/link";

import AppShell from "./components/AppShell";

export default function Home() {
  return (
    <AppShell>
      <div className="min-h-screen overflow-hidden">

        {/* ======================================================
            Hero
            ====================================================== */}

        <section className="relative border-b border-white/[0.06]">

          {/* Atmospheric background */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="absolute right-[-10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[#1769ff]/10 blur-[120px]" />

            <div className="absolute left-[30%] top-[30%] h-[300px] w-[300px] rounded-full bg-[#4d8fff]/5 blur-[100px]" />

          </div>

          <div className="relative mx-auto grid max-w-[1500px] items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:px-12 lg:py-16 xl:px-16">

            {/* ==================================================
                Hero Copy
                ================================================== */}

            <div className="max-w-2xl">

              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#6f9de8] sm:text-xs">
                Welcome to MOTION8
              </p>

              <h1 className="mt-5 text-[clamp(2.7rem,6.2vw,5rem)] font-bold leading-[0.96] tracking-[-0.05em] text-white">

                Turn ideas into

                <br />

                pixel art.

                <br />

                <span className="text-[#4d8fff]">
                  Bring them to life.
                </span>

              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-[#91a2bf] sm:text-lg sm:leading-8">
                Generate characters and environments with AI, then animate
                them into something bigger.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/generate"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#4d8fff] px-7 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(77,143,255,0.2)] transition hover:bg-[#609cff]"
                >

                  Start Creating

                  <span className="ml-3 text-base">
                    →
                  </span>

                </Link>

              </div>

            </div>

            {/* ==================================================
                Pixel Art Showcase
                ================================================== */}

            <div className="relative min-h-[260px] sm:min-h-[330px] lg:min-h-[390px]">

              {/* Main pixel-art frame */}

              <div className="absolute inset-x-0 top-1/2 mx-auto aspect-[16/10] max-w-[700px] -translate-y-1/2 overflow-hidden rounded-2xl border border-[#28436d] bg-[#091321] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">

                {/* Pixel-art inspired sky */}

                <div className="absolute inset-0 bg-[linear-gradient(180deg,#07152b_0%,#0a2340_55%,#08111d_100%)]" />

                {/* Moon */}

                <div className="motion8-moon absolute right-[18%] top-[13%] h-12 w-12 rounded-full bg-[#b9dcff] shadow-[0_0_35px_rgba(150,205,255,0.55)] sm:h-16 sm:w-16" />

                {/* Clouds */}

                <div className="absolute left-[10%] top-[24%] h-5 w-28 bg-[#193a64] opacity-80 sm:w-40" />

                <div className="absolute left-[16%] top-[19%] h-8 w-16 bg-[#244b7c] opacity-80" />

                <div className="absolute right-[5%] top-[32%] h-5 w-32 bg-[#193a64] opacity-80 sm:w-44" />

                <div className="absolute right-[16%] top-[26%] h-8 w-20 bg-[#244b7c] opacity-80" />

                {/* Mountains */}

                <div className="absolute bottom-[22%] left-[-5%] h-[48%] w-[65%] rotate-[12deg] bg-[#132d4d] [clip-path:polygon(0_100%,18%_50%,30%_70%,50%_10%,66%_62%,82%_35%,100%_100%)]" />

                <div className="absolute bottom-[20%] right-[-10%] h-[50%] w-[65%] rotate-[-10deg] bg-[#10243d] [clip-path:polygon(0_100%,20%_42%,34%_67%,56%_5%,73%_60%,100%_100%)]" />

                {/* Castle silhouette */}

                <div className="absolute bottom-[23%] right-[18%] h-[38%] w-[22%] bg-[#080f1a]">

                  <div className="absolute -left-[15%] bottom-0 h-[70%] w-[30%] bg-[#080f1a]" />

                  <div className="absolute -right-[15%] bottom-0 h-[82%] w-[30%] bg-[#080f1a]" />

                  <div className="absolute left-[34%] top-[-22%] h-[45%] w-[18%] bg-[#080f1a]" />

                  <div className="absolute left-[42%] top-[-31%] h-5 w-2 bg-[#4d8fff]" />

                  {/* Windows */}

                  <div className="absolute left-[18%] top-[30%] h-2 w-2 bg-[#ffb35c]" />

                  <div className="absolute right-[18%] top-[38%] h-2 w-2 bg-[#ffb35c]" />

                  <div className="absolute left-[43%] top-[22%] h-2 w-2 bg-[#ffb35c]" />

                </div>

                {/* Water */}

                <div className="absolute bottom-0 left-0 right-0 h-[24%] bg-[#07111d]">

                  <div className="absolute left-[8%] top-[28%] h-px w-[34%] bg-[#284d75]" />

                  <div className="absolute left-[55%] top-[45%] h-px w-[27%] bg-[#284d75]" />

                  <div className="absolute left-[25%] top-[67%] h-px w-[48%] bg-[#193a5d]" />

                </div>

                {/* Pixel grid overlay */}

                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                  }}
                />

                {/* Showcase label */}

                <div className="absolute bottom-4 left-4 rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2 backdrop-blur-sm">

                  <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-[#8aa6cf]">
                    Generated in MOTION8
                  </p>

                </div>

              </div>

              {/* Floating pixel accents */}

              <div className="absolute left-[8%] top-[12%] h-2 w-2 bg-[#4d8fff] shadow-[0_0_14px_#4d8fff]" />

              <div className="absolute right-[8%] top-[20%] h-1.5 w-1.5 bg-[#6ca8ff]" />

              <div className="absolute bottom-[12%] left-[16%] h-1.5 w-1.5 bg-[#4d8fff]" />

            </div>

          </div>

        </section>

        {/* ======================================================
            Creation Cards
            ====================================================== */}

        <section className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-12 xl:px-16">

          <div className="mx-auto max-w-[1500px]">

            {/* Section label */}

            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#71809c] sm:text-xs">
              Create
            </p>

            {/* Cards */}

            <div className="mt-5 grid gap-5 lg:grid-cols-2">

              {/* ==================================================
                  Character Card
                  ================================================== */}

              <a
                href="/generate?mode=character"
                className="group relative min-h-[420px] overflow-hidden rounded-2xl border border-[#28436d] bg-[#091523] transition duration-500 hover:-translate-y-1 hover:border-[#4d8fff] hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)] sm:min-h-[460px]"
              >

                {/* Ambient glow */}

                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#4d8fff]/10 blur-[90px] transition duration-700 group-hover:bg-[#4d8fff]/20" />

                <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#1769ff]/5 blur-[100px]" />

                {/* ==================================================
                    Showcase area
                    ================================================== */}

                <div className="absolute inset-x-5 top-5 h-[235px] overflow-hidden rounded-xl border border-[#203c62] bg-[#07111e] sm:inset-x-6 sm:top-6 sm:h-[255px]">

                  {/* Grid */}

                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(120,170,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(120,170,255,0.45) 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                    }}
                  />

                  {/* Character glow */}

                  <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4d8fff]/10 blur-[60px] transition duration-700 group-hover:bg-[#4d8fff]/20" />

                  {/* Pixel character */}

                  <div className="absolute left-1/2 top-[44%] h-[145px] w-[105px] -translate-x-1/2 -translate-y-1/2 transition duration-500 group-hover:-translate-y-[54%]">

                    {/* Head */}

                    <div className="absolute left-[27px] top-0 h-[54px] w-[54px] rounded-sm bg-[#6ca8ff] shadow-[0_0_25px_rgba(77,143,255,0.18)]" />

                    {/* Hair */}

                    <div className="absolute left-[20px] top-[-7px] h-4 w-10 bg-[#1c3150]" />

                    <div className="absolute left-[55px] top-[-7px] h-5 w-8 bg-[#1c3150]" />

                    {/* Face */}

                    <div className="absolute left-[31px] top-[22px] h-2 w-2 bg-[#07111e]" />

                    <div className="absolute right-[29px] top-[22px] h-2 w-2 bg-[#07111e]" />

                    <div className="absolute left-[43px] top-[37px] h-2 w-5 bg-[#315b94]" />

                    {/* Body */}

                    <div className="absolute left-[17px] top-[52px] h-[66px] w-[72px] rounded-sm bg-[#315b94]" />

                    {/* Chest detail */}

                    <div className="absolute left-[35px] top-[65px] h-4 w-4 bg-[#4d8fff]" />

                    <div className="absolute left-[55px] top-[65px] h-4 w-4 bg-[#244a7b]" />

                    {/* Arms */}

                    <div className="absolute left-0 top-[60px] h-[55px] w-[17px] bg-[#274d7e]" />

                    <div className="absolute right-0 top-[60px] h-[55px] w-[17px] bg-[#274d7e]" />

                    {/* Legs */}

                    <div className="absolute left-[22px] top-[112px] h-[40px] w-[25px] bg-[#1d385c]" />

                    <div className="absolute right-[22px] top-[112px] h-[40px] w-[25px] bg-[#1d385c]" />

                  </div>

                  {/* Floating pixels */}

                  <div className="absolute left-[15%] top-[25%] h-2 w-2 bg-[#4d8fff] opacity-80 transition duration-500 group-hover:-translate-y-2" />

                  <div className="absolute right-[17%] top-[35%] h-1.5 w-1.5 bg-[#6ca8ff] opacity-70 transition duration-700 group-hover:translate-y-2" />

                  <div className="absolute left-[22%] bottom-[18%] h-1.5 w-1.5 bg-[#315b94]" />

                  <div className="absolute right-[26%] bottom-[24%] h-2 w-2 bg-[#4d8fff] opacity-50" />

                  {/* Preview label */}

                  <div className="absolute left-3 top-3 rounded-md border border-white/[0.08] bg-black/35 px-2.5 py-1.5 backdrop-blur-sm">

                    <p className="text-[7px] font-medium uppercase tracking-[0.2em] text-[#7895bf]">
                      Character Preview
                    </p>

                  </div>

                </div>

                {/* ==================================================
                    Card Content
                    ================================================== */}

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">

                  <div className="flex items-end justify-between gap-6">

                    <div>

                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#5f9cff]">
                        ✦ Character
                      </p>

                      <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                        Create characters.
                      </h2>

                      <p className="mt-2 max-w-md text-sm leading-6 text-[#8fa1bd]">
                        Bring your ideas to life with AI-powered pixel
                        characters.
                      </p>

                    </div>

                    {/* Arrow */}

                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#29466d] bg-[#0c1b2e] text-lg text-[#6ca8ff] transition duration-300 group-hover:border-[#4d8fff] group-hover:bg-[#17366d] group-hover:text-white sm:flex">
                      →
                    </div>

                  </div>

                  {/* CTA */}

                  <div className="mt-5 inline-flex min-h-[44px] items-center rounded-xl bg-[#4d8fff] px-5 text-sm font-semibold text-white transition group-hover:bg-[#609cff]">

                    Create Character

                    <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>

                  </div>

                </div>

              </a>

              {/* ==================================================
                  Background Card
                  ================================================== */}

              <a
                href="/generate?mode=background"
                className="group relative min-h-[420px] overflow-hidden rounded-2xl border border-[#36346f] bg-[#101329] transition duration-500 hover:-translate-y-1 hover:border-[#665cff] hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)] sm:min-h-[460px]"
              >

                {/* Ambient glow */}

                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#665cff]/10 blur-[90px] transition duration-700 group-hover:bg-[#665cff]/20" />

                <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#4c45c7]/5 blur-[100px]" />

                {/* ==================================================
                    Showcase area
                    ================================================== */}

                <div className="absolute inset-x-5 top-5 h-[235px] overflow-hidden rounded-xl border border-[#393866] bg-[#0b0e24] sm:inset-x-6 sm:top-6 sm:h-[255px]">

                  {/* Sky */}

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,#111743_0%,#1a2350_58%,#10152d_100%)]" />

                  {/* Moon */}

                  <div className="absolute right-[16%] top-[13%] h-10 w-10 rounded-full bg-[#c4c5ff] shadow-[0_0_30px_rgba(164,156,255,0.35)] sm:h-12 sm:w-12" />

                  {/* Stars / pixels */}

                  <div className="absolute left-[17%] top-[20%] h-1.5 w-1.5 bg-[#817aff]" />

                  <div className="absolute left-[30%] top-[14%] h-2 w-2 bg-[#665cff]" />

                  <div className="absolute right-[33%] top-[24%] h-1.5 w-1.5 bg-[#aaa5ff]" />

                  {/* Clouds */}

                  <div className="absolute left-[8%] top-[31%] h-4 w-24 bg-[#30386d] opacity-80 sm:w-32" />

                  <div className="absolute left-[16%] top-[26%] h-6 w-12 bg-[#3c477e] opacity-70" />

                  <div className="absolute right-[5%] top-[37%] h-4 w-28 bg-[#30386d] opacity-75 sm:w-36" />

                  {/* Mountains */}

                  <div className="absolute bottom-[20%] left-[-4%] h-[50%] w-[62%] bg-[#242d59] [clip-path:polygon(0_100%,22%_48%,37%_72%,57%_12%,72%_58%,100%_100%)]" />

                  <div className="absolute bottom-[19%] right-[-7%] h-[52%] w-[65%] bg-[#1c2349] [clip-path:polygon(0_100%,24%_42%,39%_70%,61%_5%,78%_58%,100%_100%)]" />

                  {/* Distant mountain highlight */}

                  <div className="absolute bottom-[42%] left-[29%] h-1 w-12 rotate-[25deg] bg-[#445087] opacity-60" />

                  {/* Ground */}

                  <div className="absolute bottom-0 left-0 right-0 h-[23%] bg-[#0a0f20]" />

                  {/* Water */}

                  <div className="absolute bottom-[4%] left-[12%] h-px w-[35%] bg-[#3e4780]" />

                  <div className="absolute bottom-[10%] right-[12%] h-px w-[26%] bg-[#303967]" />

                  {/* Pixel grid */}

                  <div
                    className="absolute inset-0 opacity-[0.1]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(180,180,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(180,180,255,0.45) 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                    }}
                  />

                  {/* Preview label */}

                  <div className="absolute left-3 top-3 rounded-md border border-white/[0.08] bg-black/35 px-2.5 py-1.5 backdrop-blur-sm">

                    <p className="text-[7px] font-medium uppercase tracking-[0.2em] text-[#938eff]">
                      Environment Preview
                    </p>

                  </div>

                </div>

                {/* ==================================================
                    Card Content
                    ================================================== */}

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">

                  <div className="flex items-end justify-between gap-6">

                    <div>

                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#817aff]">
                        ◇ Background
                      </p>

                      <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                        Build worlds.
                      </h2>

                      <p className="mt-2 max-w-md text-sm leading-6 text-[#a0a2c1]">
                        Build pixel-art environments from simple ideas.
                      </p>

                    </div>

                    {/* Arrow */}

                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#3d3b72] bg-[#171936] text-lg text-[#8d86ff] transition duration-300 group-hover:border-[#665cff] group-hover:bg-[#292563] group-hover:text-white sm:flex">
                      →
                    </div>

                  </div>

                  {/* CTA */}

                  <div className="mt-5 inline-flex min-h-[44px] items-center rounded-xl bg-[#665cff] px-5 text-sm font-semibold text-white transition group-hover:bg-[#786fff]">

                    Create Background

                    <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>

                  </div>

                </div>

              </a>

            </div>

          </div>

        </section>

        {/* ======================================================
            Creative Flow
            ====================================================== */}

        <section className="relative px-6 pb-12 sm:px-10 sm:pb-16 lg:px-12 xl:px-16">

          <div className="mx-auto max-w-[1500px]">

            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b111c]">

              {/* Section heading */}

              <div className="border-b border-white/[0.06] px-6 py-5 sm:px-8">

                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#71809c] sm:text-xs">
                  The Creative Flow
                </p>

              </div>

              {/* Flow */}

              <div className="grid divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

                {/* Idea */}

                <div className="relative p-6 sm:p-7">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#111b2b] text-xl">
                      💡
                    </div>

                    <div>

                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#71809c]">
                        01
                      </p>

                      <h3 className="mt-1 text-base font-semibold text-white">
                        Idea
                      </h3>

                      <p className="mt-2 text-sm leading-5 text-[#71809c]">
                        A simple prompt is enough.
                      </p>

                    </div>

                  </div>

                </div>

                {/* Generate */}

                <div className="relative p-6 sm:p-7">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#111b2b] text-xl">
                      ✦
                    </div>

                    <div>

                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#71809c]">
                        02
                      </p>

                      <h3 className="mt-1 text-base font-semibold text-white">
                        Generate
                      </h3>

                      <p className="mt-2 text-sm leading-5 text-[#71809c]">
                        Create characters and environments.
                      </p>

                    </div>

                  </div>

                </div>

                {/* Animate */}

                <div className="relative p-6 sm:p-7">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#111b2b] text-xl">
                      ▶
                    </div>

                    <div>

                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#71809c]">
                        03
                      </p>

                      <h3 className="mt-1 text-base font-semibold text-white">
                        Animate
                      </h3>

                      <p className="mt-2 text-sm leading-5 text-[#71809c]">
                        Turn your pixel art into motion.
                      </p>

                    </div>

                  </div>

                </div>

                {/* Export */}

                <div className="relative p-6 sm:p-7">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#111b2b] text-xl">
                      ↑
                    </div>

                    <div>

                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#71809c]">
                        04
                      </p>

                      <h3 className="mt-1 text-base font-semibold text-white">
                        Export
                      </h3>

                      <p className="mt-2 text-sm leading-5 text-[#71809c]">
                        Use your creation anywhere.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </AppShell>
  );
}