import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "sonner";
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
  title: "Zaira | Mis 15 años",
  description: "Invitación de quinceañera – Zaira",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
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

        {/* Toast global – Sonner */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#04294A",
              color: "#ffffff",
              border: "1px solid rgba(194,155,77,0.4)",
              borderRadius: "14px",
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "14px",
              lineHeight: "1.5",
              boxShadow: "0 8px 32px rgba(4,41,74,0.28)",
              padding: "14px 18px",
              maxWidth: "480px",
            },
          }}
        />

        {/* Lottie Web local self-hosted */}
        <Script src="/js/lottie_svg.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
