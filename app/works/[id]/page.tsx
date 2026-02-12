"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, ProjectContent } from "../../data/projects";

// 简单的 Markdown 解析函数
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    if (line.trim() === "") {
      elements.push(<br key={`br-${index}`} />);
      return;
    }

    // 处理列表项
    if (line.trim().startsWith("- ")) {
      const content = line.trim().substring(2);
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      const boldRegex = /\*\*(.+?)\*\*/g;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`bold-${index}-${match.index}`} className="font-semibold">
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      elements.push(
        <li key={`li-${index}`} className="ml-4 mb-1">
          {parts.length > 0 ? parts : content}
        </li>
      );
      return;
    }

    // 处理普通文本中的加粗
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const boldRegex = /\*\*(.+?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={`bold-${index}-${match.index}`} className="font-semibold">
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    elements.push(
      <p key={`p-${index}`} className="mb-4">
        {parts.length > 0 ? parts : line}
      </p>
    );
  });

  return <>{elements}</>;
}

// 渲染内容组件
function renderContent(content: ProjectContent, projectId: number) {
  switch (content.type) {
    case "heading":
      return (
        <h1
          key={`heading-${content.value}`}
          className="font-sans font-bold text-4xl md:text-5xl text-gray-900 mb-8 mt-16 first:mt-0"
        >
          {content.value}
        </h1>
      );

    case "heading2":
      return (
        <h2
          key={`heading2-${content.value}`}
          className="font-sans font-bold text-3xl md:text-4xl text-gray-900 mb-6 mt-12 first:mt-0"
        >
          {content.value}
        </h2>
      );

    case "heading3":
      return (
        <h3
          key={`heading3-${content.value}`}
          className="font-sans font-semibold text-2xl md:text-3xl text-gray-800 mb-4 mt-10 first:mt-0"
        >
          {content.value}
        </h3>
      );

    case "heading4":
      return (
        <h4
          key={`heading4-${content.value}`}
          className="font-sans font-semibold text-xl md:text-2xl text-gray-800 mb-3 mt-8 first:mt-0"
        >
          {content.value}
        </h4>
      );

    case "text":
      return (
        <div
          key={`text-${content.value.substring(0, 20)}`}
          className="font-sans text-gray-700 leading-relaxed text-base md:text-lg"
        >
          {renderMarkdown(content.value)}
        </div>
      );

    case "image":
      return (
        <div
          key={`image-${content.value}`}
          className="w-full my-8 md:my-12"
        >
          <div className="relative w-full aspect-video md:aspect-auto md:h-auto">
            <Image
              src={content.value}
              alt={content.alt || "Project image"}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          {content.caption && (
            <p className="font-sans text-sm text-gray-500 mt-3 text-center">
              {content.caption}
            </p>
          )}
        </div>
      );

    case "video":
      return (
        <div
          key={`video-${content.value}`}
          className="w-full my-8 md:my-12"
        >
          <video
            src={content.value}
            controls
            className="w-full"
            style={{
              width: content.width || "100%",
              height: content.height || "auto",
            }}
          >
            您的浏览器不支持视频播放。
          </video>
          {content.caption && (
            <p className="font-sans text-sm text-gray-500 mt-3 text-center">
              {content.caption}
            </p>
          )}
        </div>
      );

    case "interactive":
      return (
        <div
          key={`interactive-${content.value}`}
          className="w-full my-8 md:my-12"
          style={{
            width: content.width || "100%",
            height: content.height || 600,
          }}
        >
          <iframe
            src={content.value}
            className="w-full h-full border-0"
            title="Interactive content"
          />
          {content.caption && (
            <p className="font-sans text-sm text-gray-500 mt-3 text-center">
              {content.caption}
            </p>
          )}
        </div>
      );

    default:
      return null;
  }
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = parseInt(params.id as string);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-sans text-2xl text-gray-900 mb-4">
            项目未找到
          </h1>
          <Link
            href="/works"
            className="font-sans text-gray-600 hover:text-gray-900 underline"
          >
            返回作品列表
          </Link>
        </div>
      </div>
    );
  }

  // 标签类别到颜色的映射（莫兰迪色系，80%透明度）
  const tagCategoryColors: Record<string, { bg: string; text: string }> = {
    technology: { bg: "bg-blue-200/80", text: "text-blue-900" },
    tool: { bg: "bg-green-200/80", text: "text-green-900" },
    design: { bg: "bg-pink-200/80", text: "text-pink-900" },
    methodology: { bg: "bg-purple-200/80", text: "text-purple-900" },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 返回按钮 */}
      <div className="sticky top-20 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="font-sans text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>返回</span>
          </button>
        </div>
      </div>

      {/* Hero 区域 - 固定宽度 Banner 图（转场核心） */}
      <div className="w-full flex justify-center px-4 md:px-8 py-8">
        <motion.div
          layoutId={`image-${project.id}`}
          className="relative"
          style={{ width: '100%', maxWidth: '1200px' }}
        >
          <div className="relative w-full">
            <Image
              src={project.coverImage}
              alt={project.title}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* 项目信息头部 */}
      <div className="max-w-7xl mx-auto px-2 md:px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-sans font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-sans text-sm text-gray-500 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="font-sans text-sm text-gray-400">•</span>
            <span className="font-sans text-sm text-gray-500">{project.year}</span>
          </div>
          <p className="font-sans text-lg text-gray-700 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* 标签 */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => {
                const colors = tagCategoryColors[tag.category] || {
                  bg: "bg-gray-200/80",
                  text: "text-gray-900",
                };
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-sans font-medium ${colors.bg} ${colors.text}`}
                  >
                    {tag.name}
                  </span>
                );
              })}
            </div>
          )}

          {/* 核心职责 */}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="font-sans text-sm text-gray-400 mb-2">核心职责</p>
              <p className="font-sans text-sm text-gray-500">
                {project.responsibilities.join(" • ")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 详情内容区域 - Minsang Choi 风格 */}
      <div className="max-w-7xl mx-auto px-2 md:px-4 pb-16 md:pb-24">
        {project.fullContent.map((content, index) => {
          // 文本和标题：居中窄宽
          if (
            content.type === "text" ||
            content.type === "heading" ||
            content.type === "heading2" ||
            content.type === "heading3" ||
            content.type === "heading4"
          ) {
            return (
              <div key={index} className="max-w-5xl mx-auto">
                {renderContent(content, project.id)}
              </div>
            );
          }

          // 图片、视频、交互：全宽
          if (
            content.type === "image" ||
            content.type === "video" ||
            content.type === "interactive"
          ) {
            return (
              <div key={index} className="w-full max-w-6xl mx-auto">
                {renderContent(content, project.id)}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
