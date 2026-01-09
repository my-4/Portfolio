"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import localFont from "next/font/local";
import { projects, Project } from "../data/projects";

// 导入自定义手写字体
const drawerFont = localFont({
  src: "../fonts/drawerFont.ttf",
  display: "swap",
});

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  // 关闭弹窗
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // 渲染内容项
  const renderContent = (content: { type: string; value: string }, index: number) => {
    switch (content.type) {
      case "heading":
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold mb-4 mt-8 first:mt-0 font-sans"
          >
            {content.value}
          </h2>
        );
      case "text":
        return (
          <p
            key={index}
            className="font-sans text-base md:text-lg text-gray-700 leading-relaxed mb-6"
          >
            {content.value}
          </p>
        );
      case "image":
        return (
          <div key={index} className="my-8">
            <Image
              src={content.value}
              alt="Project image"
              width={800}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        );
      default:
        return null;
    }
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
                layoutId={`card-${project.id}`}
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
                onClick={() => setSelectedProject(project)}
              >
                {/* 项目卡片 */}
                <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden flex flex-col justify-end p-6 hover:bg-gray-300 transition-colors">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover -z-10"
                  />
                  <div className="relative z-10">
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

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={handleCloseModal}
            />
            
            {/* 弹窗内容 */}
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-lg shadow-2xl z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* 弹窗内容区域 */}
              <div className="p-8 md:p-16">
                {/* 封面图 */}
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.coverImage}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 标题和基本信息 */}
                <div className="mb-8 max-w-7xl mx-auto">
                  <h1 className="font-sans font-bold text-3xl md:text-4xl mb-4">
                    {selectedProject.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="uppercase tracking-wider">
                      {selectedProject.category}
                    </span>
                    <span>•</span>
                    <span>{selectedProject.year}</span>
                  </div>
                  {selectedProject.description && (
                    <p className="mt-4 font-sans text-lg text-gray-700 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  )}
                </div>

                {/* 详细内容 */}
                <div className="max-w-7xl mx-auto">
                  {selectedProject.fullContent.map((content, index) =>
                    renderContent(content, index)
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
