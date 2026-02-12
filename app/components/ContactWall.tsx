"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import localFont from "next/font/local";

const drawerFont = localFont({
  src: "../fonts/drawerFont.ttf",
  display: "swap",
});

const contactData = {
  email: "my_luv4@outlook.com",
  linkedin: "https://www.linkedin.com/in/yuanmyy",
  linkedinDisplay: "/in/yuanmyy",
};

export default function ContactWall() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(contactData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    // 1. 父容器：设为 relative 作为画布，h-screen 撑满屏幕
    <div className="relative w-full h-screen bg-white overflow-hidden">
      
      {/* ==================== Email 便签 (左上位置) ==================== */}
      <div 
        className="absolute aspect-[4/3]" // 删掉 relative，改为 absolute 定位在墙上
        // 👇【关键修改】在这里控制整张便利贴在墙上的位置和大小
        style={{
          top: "9%",    // 距离墙顶部的距离
          left: "-1%",   // 距离墙左边的距离
          width: "54%",  // 便利贴的大小 (相对于屏幕宽度)
          minWidth: "300px", // 保证手机上不会太小
        }}
      >
        {/* 背景图 (保持不变) */}
        <Image
          src="/images/Email.jpg"
          alt="Email Note"
          fill
          className="object-contain pointer-events-none"
        />

        {/* 内部文字热区 (保持不变，相对于便利贴定位) */}
        <motion.div
          className="absolute cursor-pointer flex items-center justify-center"
          style={{ top: "45%", left: "10%", width: "80%", height: "20%" }}
          onClick={handleCopyEmail}
          whileHover={{ scale: 1.15, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <span className="font-sans text-black text-lg md:text-xl lg:text-2xl font-medium tracking-wide whitespace-nowrap">
            {contactData.email}
          </span>
        </motion.div>

        {/* 提示气泡 - 显示在邮箱地址右下角 */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`absolute z-[9999] bg-white text-black px-3 py-1 rounded-md text-sm tracking-widest pointer-events-none shadow-lg ${drawerFont.className}`}
              style={{
                top: "60%",  // 邮箱文字底部 (45% + 20%)
                left: "60%", // 邮箱文字右边缘 (10% + 80%)
                transform: "translateX(-100%)", // 让气泡从右边缘向左对齐
              }}
            >
              Copied! ✨
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* ==================== LinkedIn 便签 (右下位置) ==================== */}
      <div 
        className="absolute aspect-[4/3]"
        // 👇【关键修改】在这里控制整张便利贴在墙上的位置和大小
        style={{
          top: "9%",    // 这一张贴得低一点
          left: "45%",   // 这一张贴在右边
          width: "54%",  // 同样的大小
          minWidth: "300px",
        }}
      >
        {/* 背景图 */}
        <Image
          src="/images/LinkedIn.jpg"
          alt="LinkedIn Note"
          fill
          className="object-contain pointer-events-none"
        />

        {/* 内部文字热区 */}
        <motion.a
          href={contactData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute cursor-pointer flex items-center justify-center"
          style={{ top: "52%", left: "16%", width: "70%" }}
          whileHover={{ scale: 1.15, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <span className="font-sans text-black text-xl md:text-2xl font-medium whitespace-nowrap">
            {contactData.linkedinDisplay}
          </span>
        </motion.a>
      </div>

    </div>
  );
}