import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "个人作品集",
  description: "基于Next.js和Tailwind CSS的个人作品集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {/* 导航栏 */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}