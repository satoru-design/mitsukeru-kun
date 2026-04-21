import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

import DevNavigation from "./components/DevNavigation";

export const metadata: Metadata = {
  title: "見つける君 - 民泊清掃プロフェッショナル・マッチング",
  description: "民泊の清掃コストを最適化。スマホひとつで、信頼できる清掃プロがすぐ見つかる民泊オーナー向けマッチングプラットフォーム。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${notoSansJP.variable} antialiased`}
      >
        {children}
        <DevNavigation />
      </body>
    </html>
  );
}
