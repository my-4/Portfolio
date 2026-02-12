"use client";

import { Welcome } from "./components/AnimaHome";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "./data/projects";

export default function Home() {
  // 选择前 6 个项目作为精选作品
  const featuredProjects = projects.slice(0, 6);

  return (
    <div className="w-full">
      <Welcome />
      
      {/* 精选作品 */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* 标题 */}
          <div className="mb-12 text-center">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-black mb-4">
              精选作品
            </h2>
            <Link 
              href="/works"
              className="font-sans text-sm md:text-base text-gray-600 hover:text-black transition-colors"
            >
              查看全部作品 →
            </Link>
          </div>

          {/* 项目网格 */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:pt-1 pb-12">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              layout
            >
            {featuredProjects.map((project) => (
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
                className="relative group cursor-pointer"
              >
                <Link href={`/works?category=${project.category}`}>
                  {/* 项目卡片 */}
                  <div className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden flex flex-col justify-end p-6 hover:bg-gray-300 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
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
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}