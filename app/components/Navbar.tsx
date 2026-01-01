"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { href: '/', label: '主页' },
    { href: '/works', label: '作品' },
    { href: '/about', label: '关于我' },
    { href: '/contact', label: '联系我' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white h-20 flex justify-end items-center px-16 border-b border-black">
      <div className="flex items-center space-x-8">
        {menuItems.map((item) => (
          <div
            key={item.href}
            className="relative group"
            onMouseEnter={() => setHoveredItem(item.href)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              href={item.href}
              className="nav-link px-4 py-2 font-sans font-thin text-black text-[20px] tracking-[7.04px] leading-[normal] whitespace-nowrap"
            >
              {item.label}
            </Link>
            {/* 只有当鼠标悬停时才渲染粉色椭圆 */}
            {hoveredItem === item.href && (
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-6 rounded-full bg-[#FFD1DC] z-[-1]"
                layoutId="nav-hover"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
