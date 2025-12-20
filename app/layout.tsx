import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/json-ld";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nuxron.webrizen.com"),
  title: {
    default: "Nuxron - Computational Biology Platform",
    template: "%s | Nuxron",
  },
  description:
    "Free, anonymous, no-signup computational biology platform. Edit sequences, simulate protein folding, and visualize genomic data directly in your browser. Zero cloud uploads.",
  keywords: [
    "Bioinformatics",
    "Computational Biology",
    "DNA Editor",
    "Protein Simulation",
    "Privacy-first",
    "Local-first",
    "Genomics",
    "Web Engineering",
    "Open Source",
  ],
  authors: [
    {
      name: "Nuxron",
      url: "https://nuxron.webrizen.com",
    },
  ],
  creator: "Nuxron",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nuxron.webrizen.com",
    title: "Nuxron - Computational Biology Platform",
    description:
      "Edit sequences, simulate protein folding, and visualize genomic data directly in your browser. Zero cloud uploads. Your research never leaves your device.",
    siteName: "Nuxron",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nuxron - Privacy-First Bioinformatics Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuxron - Computational Biology Platform",
    description:
      "Edit sequences, simulate protein folding, and visualize genomic data directly in your browser. Zero cloud uploads.",
    images: ["/og-image.png"],
    creator: "@nuxron_bio",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.className} antialiased`} suppressHydrationWarning>
        <JsonLd />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
