"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "@/lib/data";

interface ProjectCarouselProps {
  accentColor: string;
}

export default function ProjectCarousel({ accentColor }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const prev = () => go((index - 1 + projects.length) % projects.length);
  const next = () => go((index + 1) % projects.length);

  const project = projects[index];

  const variants = {
    enter:  (dir: number) => ({ x: dir > 0 ?  320 : -320, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? -320 :  320, opacity: 0, scale: 0.95 }),
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">
      {/* Card */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: 200 }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="w-full rounded-2xl p-8 flex flex-col gap-4"
            style={{
              border: `2px solid ${accentColor}55`,
              backgroundColor: accentColor + "18",
            }}
          >
            {/* Numero + titre */}
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{ backgroundColor: accentColor + "30", color: accentColor }}
              >
                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-[family-name:var(--font-holtwood)]" style={{ color: accentColor }}>
                {project.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed" style={{ color: accentColor, opacity: 0.82 }}>
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{
                    backgroundColor: accentColor + "25",
                    color: accentColor,
                    border: `1px solid ${accentColor}55`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Lien */}
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold underline underline-offset-4 w-fit"
                style={{ color: accentColor }}
              >
                Voir le projet →
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-5">
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.12, backgroundColor: accentColor }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.15 }}
          className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg"
          style={{ border: `2px solid ${accentColor}`, color: accentColor }}
        >
          ←
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2 items-center">
          {projects.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              animate={{
                width:   i === index ? 24 : 10,
                opacity: i === index ? 1  : 0.4,
              }}
              transition={{ duration: 0.3 }}
              className="h-2.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          ))}
        </div>

        <motion.button
          onClick={next}
          whileHover={{ scale: 1.12, backgroundColor: accentColor }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.15 }}
          className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg"
          style={{ border: `2px solid ${accentColor}`, color: accentColor }}
        >
          →
        </motion.button>
      </div>
    </div>
  );
}
