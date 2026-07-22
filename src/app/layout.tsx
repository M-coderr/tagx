import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: "TagX | Premium Garment Trims & Apparel Accessories Manufacturer",
  description:
    "Premium garment trims manufactured in-house — Hang Tags, Woven Labels, PU Labels, and Satin Labels with luxury finishes.",

  appleWebApp: {
    title: "TagX",
  },

  manifest: "/site.webmanifest",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${archivoBlack.variable} antialiased`}>
      <meta name="apple-mobile-web-app-title" content="TagX" />
      <body>{children}</body>
    </html>
  );
}
