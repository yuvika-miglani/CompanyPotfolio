import type { Metadata } from "next";
import { Inter, Libre_Caslon_Text } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreCaslonText = Libre_Caslon_Text({
  weight: ["400", "700"],
  variable: "--font-libre-caslon",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1126 Labs | Operations Studio Rebuilt Around AI",
  description: "November 26 — the day we decided operations shouldn't be built around tools, but around how people actually think. We are an operations studio for businesses ready to rebuild around AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreCaslonText.variable}`}>
      <body>{children}</body>
    </html>
  );
}
