"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

interface AnimatedFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export default function AnimatedFrame({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: AnimatedFrameProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 鼠标位置 Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 使用 Spring 让动画有物理感
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // 光泽层位置（根据鼠标位置移动，转换为百分比）
  const shineXPercent = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [0, 100]),
    springConfig
  );
  const shineYPercent = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [0, 100]),
    springConfig
  );
  
  // 使用 useMotionValue 存储背景位置字符串
  const shinePosition = useMotionValue("50% 50%");
  
  // 监听位置变化并更新字符串
  useEffect(() => {
    const unsubscribeX = shineXPercent.on("change", (x) => {
      shineYPercent.get() !== undefined && shinePosition.set(`${x}% ${shineYPercent.get()}%`);
    });
    const unsubscribeY = shineYPercent.on("change", (y) => {
      shineXPercent.get() !== undefined && shinePosition.set(`${shineXPercent.get()}% ${y}%`);
    });
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [shineXPercent, shineYPercent, shinePosition]);

  // 监听鼠标移动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 计算鼠标在窗口中的相对位置（-0.5 到 0.5）
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 呼吸动画（仅在未悬停时）
  const breathingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div
      className="relative w-full"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full"
        style={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.05 : 1,
        }}
        animate={isHovered ? {} : breathingAnimation}
        transition={{
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 25,
          },
        }}
      >
        {/* 相框图片 */}
        <div className="relative w-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-auto object-contain ${className}`}
            priority={priority}
          />

          {/* 光泽层 */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                135deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.1) 30%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.1) 70%,
                rgba(255, 255, 255, 0) 100%
              )`,
              backgroundSize: "200% 200%",
              backgroundPosition: shinePosition,
              mixBlendMode: "overlay",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
