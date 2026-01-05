"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// 抽屉配置数组 - 使用百分比定位相对于图片
const drawerConfig = [
  {
    id: "interaction",
    label: "交互设计",
    top: "33%",
    left: "14%",
    width: "72%",
    height: "11%",
  },
  {
    id: "service",
    label: "服务设计",
    top: "46%",
    left: "14%",
    width: "72%",
    height: "11%",
  },
  {
    id: "product",
    label: "产品设计",
    top: "59%",
    left: "14%",
    width: "72%",
    height: "11%",
  },
  {
    id: "visual",
    label: "视觉设计",
    top: "72%",
    left: "14%",
    width: "72%",
    height: "11%",
  },
];

export const MacbookAir = (): React.ReactElement => {
  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-10">
      {/* 响应式容器：移动端垂直排列，桌面端水平排列 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-7xl mx-auto">
        {/* 左列：柜子图片 */}
        <div className="relative w-full md:w-auto flex-shrink-0">
          <div className="relative w-full max-w-md">
            <Image
              src="/images/cabinet-bg.jpg"
              alt="手绘柜子背景图"
              width={1200}
              height={1800}
              className="w-full h-auto object-contain"
              priority
            />

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
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Link
                  href={`/works?category=${drawer.id}`}
                  className="block w-full h-full bg-pink-500/30 rounded-sm"
                >
                  {/* 可选：显示标签用于调试 */}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold pointer-events-none">
                    {drawer.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 右列：欢迎文字 - 垂直居中对齐柜子高度 */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
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
