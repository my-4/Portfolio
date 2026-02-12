"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../data/projects";

const categories = [
  { id: "all", label: "All" },
  { id: "interaction", label: "Interaction" },
  { id: "service", label: "Service" },
  { id: "product", label: "Product" },
  { id: "visual", label: "Visual" },
];

// 内部组件：包含 useSearchParams 逻辑与原有界面
function WorksContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // 从 URL 参数获取 category（如果存在）
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // 过滤项目
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  // 标签类别到颜色的映射（莫兰迪色系，80%透明度）
  const tagCategoryColors: Record<string, { bg: string; text: string }> = {
    technology: { bg: "bg-blue-200/80", text: "text-blue-900" },      // 技术 - 灰蓝色
    tool: { bg: "bg-green-200/80", text: "text-green-900" },          // 工具 - 灰绿色
    design: { bg: "bg-pink-200/80", text: "text-pink-900" },          // 设计 - 灰粉色
    methodology: { bg: "bg-purple-200/80", text: "text-purple-900" }, // 方法论 - 灰紫色
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 粘性筛选栏 */}
      <div className="sticky top-20 z-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-wrap gap-4 md:gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 font-sans font-thin text-black text-sm md:text-base tracking-widest transition-colors ${
                  selectedCategory === category.id
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 项目网格 */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:pt-1 pb-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.3,
                }}
                className="relative group"
              >
                <Link href={`/works/${project.id}`}>
                  {/* 项目卡片 */}
                  <div className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden flex flex-col justify-end p-6 hover:bg-gray-300 shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <motion.div
                      layoutId={`image-${project.id}`}
                      className="absolute inset-0"
                    >
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="relative z-10 bg-gradient-to-t from-white/100 via-white/100 to-white/85 px-6 py-4 -mx-6 -mb-6 mt-auto">
                      <h3 className="font-sans font-medium text-black text-xl mb-2">
                        {project.title}
                      </h3>
                      <p className="font-sans font-thin text-gray-400 text-sm uppercase tracking-wider">
                        {project.category}
                      </p>
                      <p className="font-sans font-thin text-gray-500 text-xs mt-1">
                        {project.year}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 如果没有匹配的项目 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="font-sans font-thin text-gray-500 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// 默认导出：Suspense 包裹内部组件
export default function WorksPage() {
  return (
    <Suspense fallback={<div />}>
      <WorksContent />
    </Suspense>
  );
}