"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import localFont from "next/font/local";

// 加载自定义导航栏字体
const navFont = localFont({
  src: "../fonts/navbarFont.ttf",
  display: "swap",
});

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { href: '/', label: 'HOME' },
    { href: '/works', label: 'WORK' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white h-20 flex justify-end items-center px-16 relative">
      <div className="flex items-center space-x-8" onMouseLeave={() => setHoveredItem(null)}>
        {menuItems.map((item) => (
          <div
            key={item.href}
            className="relative group"
            onMouseEnter={() => setHoveredItem(item.href)}
          >
            <Link
              href={item.href}
              className={`nav-link px-4 py-2 text-black text-[20px] tracking-widest leading-[normal] whitespace-nowrap uppercase ${navFont.className}`}
            >
              {item.label}
            </Link>
            {/* 只有当鼠标悬停时才渲染粉色椭圆 */}
            {hoveredItem === item.href && (
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-[52%] w-[100%] h-12 rounded-[50%] bg-[#FFEFEF] z-[-1]"
                layoutId="nav-hover"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>
      {/* Custom bottom border line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[96%] h-[1px] bg-black" />
    </nav>
  );
}
