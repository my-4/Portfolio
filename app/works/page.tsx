"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// 临时 mock 数据
const projects = [
  { id: 1, title: "Project Demo 1", category: "interaction", year: "2024" },
  { id: 2, title: "Project Demo 2", category: "service", year: "2024" },
  { id: 3, title: "Project Demo 3", category: "product", year: "2024" },
  { id: 4, title: "Project Demo 4", category: "visual", year: "2024" },
  { id: 5, title: "Project Demo 5", category: "interaction", year: "2024" },
  { id: 6, title: "Project Demo 6", category: "service", year: "2024" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "interaction", label: "Interaction" },
  { id: "service", label: "Service" },
  { id: "product", label: "Product" },
  { id: "visual", label: "Visual" },
];

export default function WorksPage() {
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
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.3,
                }}
                className="relative group cursor-pointer"
              >
                {/* 灰色占位符卡片 */}
                <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden flex flex-col justify-end p-6 hover:bg-gray-300 transition-colors">
                  <div>
                    <h3 className="font-sans font-medium text-black text-xl mb-2">
                      {project.title}
                    </h3>
                    <p className="font-sans font-thin text-gray-600 text-sm uppercase tracking-wider">
                      {project.category}
                    </p>
                    <p className="font-sans font-thin text-gray-500 text-xs mt-1">
                      {project.year}
                    </p>
                  </div>
                </div>
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

