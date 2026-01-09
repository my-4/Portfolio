"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import localFont from "next/font/local";

// 导入自定义字体
const drawerFont = localFont({
  src: "../fonts/drawerFont.ttf",
  display: "swap",
});

// 抽屉配置数组 - 使用百分比定位相对于图片
const drawerConfig = [
  {
    id: "interaction",
    label: "交互设计",
    top: "29%",
    left: "16%",
    width: "68%",
    height: "14%",
  },
  {
    id: "service",
    label: "服务设计",
    top: "47%",
    left: "17%",
    width: "64%",
    height: "11%",
  },
  {
    id: "product",
    label: "产品设计",
    top: "61%",
    left: "19%",
    width: "63%",
    height: "11%",
  },
  {
    id: "visual",
    label: "视觉设计",
    top: "75%",
    left: "19%",
    width: "63%",
    height: "10%",
  },
];

export const Welcome = (): React.ReactElement => {
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-10">
      {/* 响应式容器：移动端垂直排列，桌面端水平排列 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-7xl mx-auto">
        {/* 左列：柜子图片 */}
        <div className="relative w-full md:w-auto flex-shrink-0 overflow-visible">
          <div className="relative w-full max-w-6xl scale-[1.8] origin-center translate-x-10 translate-y-30">
            {/* 底层：默认背景图 */}
            <Image
              src="/images/cabinet-bg.jpg"
              alt="手绘柜子背景图"
              width={1200}
              height={1800}
              className="w-full h-auto object-contain"
              priority
            />

            {/* 顶层：激活背景图 */}
            <Image
              src="/images/cabinet-bg-active.jpg"
              alt="手绘柜子背景图（激活状态）"
              width={1200}
              height={1800}
              className={`absolute inset-0 w-full h-auto object-contain pointer-events-none transition-opacity duration-300 ${
                isPhoneHovered ? "opacity-100" : "opacity-0"
              }`}
            />


            {/* === ✨ 新增：个人照片交互区域 === */}
            <motion.div
              className="absolute z-20 cursor-pointer group" // group 用于控制内部蒙版的显示
              style={{
                top: "7%",      // 根据背景图相框位置微调
                left: "20%",    // 根据背景图相框位置微调
                width: "23%",   // 根据背景图相框位置微调
                willChange: "transform", // 优化性能，防止放大时模糊
              }}
              // 1. 去掉了 animate 属性，保持静止
              // 2. 只有悬停时放大
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Link href="/about" className="block w-full h-full relative overflow-hidden rounded-sm">

                {/* 照片本体 */}
                <div className="w-full h-full relative aspect-square">
                  <Image
                    src="/images/myPhoto.jpg" // 确保路径正确
                    alt="About Me"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* === 灰色透明蒙版 (交互引导) === */}
                {/* 默认 opacity-0，父级 hover 时变为 opacity-100 */}
                <div className="absolute inset-0 bg-gray-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">

                </div>

              </Link>
            </motion.div>
            {/* === 照片区域结束 === */}

            {/* === 电话交互区域 === */}
            <div
              className="absolute cursor-pointer z-10"
              style={{
                top: "10%",
                left: "55%",
                width: "31%",
                height: "15%",
              }}
              onMouseEnter={() => setIsPhoneHovered(true)}
              onMouseLeave={() => setIsPhoneHovered(false)}
            >
              <Link
                href="/contact"
                className="block w-full h-full"
              />
            </div>
            {/* === 电话区域结束 === */}

            {/* 可点击的抽屉区域 - 使用绝对定位，相对于图片容器 */}
            {drawerConfig.map((drawer) => (
              <motion.div
                key={drawer.id}
                className="absolute cursor-pointer"
                style={{
                  top: drawer.top,
                  left: drawer.left,
                  width: drawer.width,
                  height: drawer.height,
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Link
                  href={`/works?category=${drawer.id}`}
                  className="block w-full h-full bg-pink-500/5 rounded-sm"
                >
                  {/* 可选：显示标签用于调试 */}
                  <span className={`absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#F25550]/80 text-lg pointer-events-none ${drawerFont.className}`}>
                    {drawer.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 右列：欢迎文字 - 垂直居中对齐柜子高度 */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto md:ml-55 mt-50">
          <p className="font-sans font-thin text-black tracking-widest text-2xl md:text-4xl leading-relaxed text-center md:text-left">
        欢迎来到我的房间，
        <br />
        在此进行自由的探索吧！
      </p>
        </div>
      </div>
    </div>
  );
};
