// ============================================================
//
// MOTION8 — Root Layout
//
// ------------------------------------------------------------
//
// RESPONSIBILITIES:
//
// - Provides the root HTML document for MOTION8.
// - Loads the global MOTION8 stylesheet.
// - Provides the page metadata.
// - Keeps the root document minimal and predictable.
//
// DOES NOT CONTROL:
//
// - Application shell.
// - Navigation.
// - Character generation.
// - Background generation.
// - AI generation.
// - Image editing.
// - Animation processing.
// - Authentication.
// - Billing.
// - Database logic.
//
// ============================================================

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOTION8",
  description: "Turn ideas into pixel art — and bring that pixel art to life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}