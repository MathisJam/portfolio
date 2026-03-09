"use client";

import React from "react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  bgColor: string;
  accentColor: string;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  bgColor,
  accentColor,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative h-screen w-full flex items-center justify-center overflow-hidden ${className}`}
      style={{ scrollSnapAlign: "start", backgroundColor: bgColor }}
    >
      <AnimatedBackground color={accentColor} bgColor={bgColor} />
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}
