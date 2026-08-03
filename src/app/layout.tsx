import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import "./globals.css";
import { websiteSchema, organizationSchema, faqSchema } from "@/lib/schema";

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
  metadataBase: new URL("https://tagx.co.in"),
  title: {
    default: "TagX | Garment Trims & Apparel Accessories Manufacturer in Ahmedabad, India",
    template: "%s | TagX Garment Accessories",
  },
  description:
    "TagX is a premier in-house manufacturer of luxury Hang Tags, Woven Labels, Satin Wash Care Labels, and PU Leather Labels for apparel & fashion brands across India.",
  keywords: [
    "Garment Trims Manufacturer",
    "Hang Tags Manufacturer Ahmedabad",
    "Custom Clothing Labels India",
    "Woven Labels Manufacturer",
    "Satin Wash Care Labels",
    "PU Leather Labels",
    "Apparel Accessories Manufacturer",
    "Custom Garment Tags",
    "Clothing Brand Tags Ahmedabad",
    "Die Cut Hang Tags",
    "Foil Stamped Tags",
    "TagX",
    "TagX Ahmedabad",
  ],
  authors: [{ name: "TagX", url: "https://tagx.co.in" }],
  creator: "TagX",
  publisher: "TagX",
  alternates: {
    canonical: "https://tagx.co.in",
  },
  openGraph: {
    title: "TagX | Premium Garment Trims & Apparel Accessories Manufacturer",
    description:
      "In-house manufactured luxury Hang Tags, Woven Labels, Satin Wash Care Labels, and PU Labels with custom foil, embossing, and die-cut finishes in Ahmedabad, India.",
    url: "https://tagx.co.in",
    siteName: "TagX",
    images: [
      {
        url: "https://tagx.co.in/tag1.jpeg",
        width: 1200,
        height: 630,
        alt: "TagX Garment Accessories and Custom Hang Tags",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TagX | Premium Garment Trims & Apparel Accessories Manufacturer",
    description:
      "Custom Hang Tags, Woven Labels, Satin Labels, and PU Labels manufactured in-house in Ahmedabad, Gujarat.",
    images: ["https://tagx.co.in/tag1.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    title: "TagX",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${archivoBlack.variable} antialiased`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="TagX" />
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
