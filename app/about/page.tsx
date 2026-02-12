"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import localFont from "next/font/local";
import AnimatedFrame from "../components/AnimatedFrame";

// 加载自定义字体
const aboutFont = localFont({
  src: "../fonts/aboutFont.ttf",
  display: "swap",
  variable: "--font-about",
});

export default function AboutPage() {

  return (
    <div className="min-h-screen w-full overflow-hidden flex items-center justify-center relative">
      {/* 背景：star-bg.png 重复平铺 */}
      <div
        className="absolute inset-0 bg-cover bg-repeat"
        style={{
          backgroundImage: "url('/images/star-bg.png')",
          backgroundSize: "auto",
        }}
      >
        {/* 白色渐变遮罩，确保文字可读性 */}
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* 如果背景图片加载失败，使用 CSS 渐变作为后备 */}
      <div
        className="absolute inset-0 opacity-0"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(255, 182, 193, 0.3) 2px, transparent 2px),
                       radial-gradient(circle at 80% 70%, rgba(255, 192, 203, 0.3) 2px, transparent 2px),
                       radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.2) 1px, transparent 1px)`,
          backgroundSize: "100px 100px, 120px 120px, 80px 80px",
        }}
      ></div>

      {/* 主内容容器 */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          {/* 标题区域（顶部） */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-thin text-black mb-4 md:mb-6 ${aboutFont.className}`}>
              Yuan, 一个热爱生活的设计师。
            </h1>

            {/* 标签 */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-6 md:mt-8">
              <span className={`px-4 py-2 bg-white text-sm md:text-base text-gray-800 shadow-md ${aboutFont.className}`}>
                Age: 21
              </span>
              <span className={`px-4 py-2 bg-white text-sm md:text-base text-gray-800 shadow-md ${aboutFont.className}`}>
                Base: 杭州
              </span>
            </div>
          </div>

          {/* 中心视觉：framed-portrait.png */}
          <div className="relative w-full flex justify-center items-center my-8 md:my-12">
            {/* 核心容器：包裹画框和所有标签，使用锚点定位 */}
            <div className="relative w-[280px] md:w-[350px] lg:w-[400px]">
              {/* 画框：使用 3D 视差倾斜效果 */}
              <AnimatedFrame
                src="/images/framed-portrait.png"
                alt="Framed Portrait"
                width={400}
                height={500}
                priority
              />

              {/* 手写注释 - 桌面模式（相对于核心容器绝对定位） */}
              <div className="hidden md:block pointer-events-none">
                {/* Top-Left (10 o'clock) - handwritten-zju.png */}
                <div className="absolute top-0 left-0 -translate-x-[75%] -translate-y-[15%] md:-translate-x-[86%] md:-translate-y-[30%]">
                  <Image
                    src="/images/handwritten-zju.png"
                    alt="ZJU"
                    width={450}
                    height={300}
                    className="w-auto h-auto max-w-[360px] md:max-w-[450px] opacity-90"
                  />
                </div>

                {/* Left (9 o'clock) - handwritten-mp.png */}
                <div className="absolute top-2/3 left-0 -translate-x-[65%] -translate-y-1/2 md:-translate-x-[80%]">
                  <Image
                    src="/images/handwritten-mp.png"
                    alt="Official Account"
                    width={360}
                    height={240}
                    className="w-auto h-auto max-w-[240px] md:max-w-[360px] opacity-90"
                  />
                </div>

                {/* Bottom-Left (7 o'clock) - handwritten-vibecoder.png (旋转) */}
                <div className="absolute bottom-0 left-0 -translate-x-[55%] translate-y-[20%] md:-translate-x-[75%] md:translate-y-[50%] -rotate-6">
                  <Image
                    src="/images/handwritten-vibecoder.png"
                    alt="Vibe Coder"
                    width={250}
                    height={150}
                    className="w-auto h-auto max-w-[150px] md:max-w-[250px] opacity-90"
                  />
                </div>

                {/* Top-Right (2 o'clock) - handwritten-creator.png */}
                <div className="absolute top-0 right-0 translate-x-[70%] -translate-y-[20%] md:translate-x-[90%] md:-translate-y-[25%]">
                  <Image
                    src="/images/handwritten-creator.png"
                    alt="Content Creator"
                    width={338}
                    height={225}
                    className="w-auto h-auto max-w-[270px] md:max-w-[338px] opacity-90"
                  />
                </div>

                {/* Bottom-Right (4 o'clock) - handwritten-pingpong.png */}
                <div className="absolute bottom-0 right-0 translate-x-[70%] translate-y-[20%] md:translate-x-[87%] md:translate-y-[35%]">
                  <Image
                    src="/images/handwritten-pingpong.png"
                    alt="Aesthetics"
                    width={338}
                    height={225}
                    className="w-auto h-auto max-w-[270px] md:max-w-[338px] opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 手写注释 - 移动端模式（垂直堆叠） */}
          <div className="md:hidden flex flex-col items-center gap-6 mt-8 mb-8">
            <Image
              src="/images/handwritten-zju.png"
              alt="ZJU"
              width={450}
              height={300}
              className="w-auto h-auto max-w-[420px] opacity-90"
            />
            <Image
              src="/images/handwritten-mp.png"
              alt="Official Account"
              width={450}
              height={300}
              className="w-auto h-auto max-w-[420px] opacity-90"
            />
            <div className="-rotate-6">
              <Image
                src="/images/handwritten-vibecoder.png"
                alt="Vibe Coder"
                width={450}
                height={300}
                className="w-auto h-auto max-w-[420px] opacity-90"
              />
            </div>
            <Image
              src="/images/handwritten-creator.png"
              alt="Content Creator"
              width={450}
              height={300}
              className="w-auto h-auto max-w-[420px] opacity-90"
            />
            <Image
              src="/images/handwritten-pingpong.png"
              alt="Aesthetics"
              width={450}
              height={300}
              className="w-auto h-auto max-w-[420px] opacity-90"
            />
          </div>

          {/* Call to Action 按钮（底部） */}
          <div className="mt-8 md:mt-12">
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 md:px-12 md:py-4 bg-[#BD6E78] text-white font-sans text-base md:text-lg font-medium rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
