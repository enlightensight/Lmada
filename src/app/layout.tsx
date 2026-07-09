import type { Metadata } from "next";
import { Crimson_Text, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lambda CDMO — Integrated Biologics Solutions & GMP Manufacturing",
  description: "Lambda operates as an integrated solutions provider for biologics drug development, cGMP manufacturing, cell line engineering, and clinical trials enablement globally.",
  keywords: [
    "biologics CDMO",
    "GMP manufacturing",
    "cell line engineering",
    "drug substance",
    "drug product aseptic filling",
    "monoclonal antibodies mAbs",
    "bispecific antibodies",
    "antibody-drug conjugates ADCs",
    "First in Human clinical trials",
    "biosimilars development",
    "analytical characterization"
  ],
  authors: [{ name: "Lambda CDMO Scientific Team" }],
  openGraph: {
    title: "Lambda CDMO — Integrated Biologics Solutions & GMP Manufacturing",
    description: "Integrated solutions provider for biologics drug development, GMP manufacturing, and global clinical trials enablement.",
    url: "https://lambda-cdmo.com",
    siteName: "Lambda CDMO",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${crimsonText.variable} ${sourceSans3.variable}`}>
      <body className="font-sans antialiased text-foreground bg-background selection:bg-neutral-200">
        <CustomCursor />
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
