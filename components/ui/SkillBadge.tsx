"use client";

import { motion } from "motion/react";
import { popIn } from "@/lib/variants";

interface Skill {
  name: string;
  color: string;
}

interface SkillBadgeProps {
  skill: Skill;
  bg?: string;
  accent?: string;
}

export default function SkillBadge({ skill, bg = "#1a1a1a", accent = "#577aac" }: SkillBadgeProps) {
  return (
    <motion.div
      variants={popIn}
      whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
      className="flex items-center justify-center p-4 rounded-xl font-semibold text-sm cursor-default"
      style={{
        backgroundColor: accent + "20",
        border: `1.5px solid ${accent}66`,
        color: accent,
      }}
    >
      {skill.name}
    </motion.div>
  );
}
