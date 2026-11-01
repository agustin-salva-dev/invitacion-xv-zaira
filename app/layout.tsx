import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const aboreto = localFont({
  src: "../public/fonts/aboreto.woff2",
  variable: "--font-aboreto",
  display: "swap",
});

const nunito = localFont({
  src: "../public/fonts/nunito.woff2",
  variable: "--font-nunito",
  display: "swap",
});

const cinzel = localFont({
  src: "../public/fonts/cinzel.ttf",
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zaira ::: Mis 15 años",
  description: "Invitación de quinceañera – Zaira",
};

export const viewport: Viewport = {
  themeColor: "#04294A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-AR"
      className={`${aboreto.variable} ${nunito.variable} ${cinzel.variable}`}
    >
      <body>
        {children}

        {/* Lottie Web local self-hosted */}
        <Script
          src="/js/lottie_svg.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
