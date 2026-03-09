"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const LimeCursor = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="47" fill="#5cf964" opacity="0.9" />
    <circle cx="50" cy="50" r="38" stroke="#3aaa40" strokeWidth="2" opacity="0.6" fill="none" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <line
          key={i}
          x1="50" y1="50"
          x2={50 + 38 * Math.cos(rad)}
          y2={50 + 38 * Math.sin(rad)}
          stroke="#3aaa40" strokeWidth="1.5" opacity="0.6"
        />
      );
    })}
    <circle cx="50" cy="50" r="5" fill="#3aaa40" opacity="0.9" />
  </svg>
);

export default function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);

  const springX = useSpring(cursorX, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20, mass: 0.5 });
  const springScale = useSpring(scale, { stiffness: 300, damping: 25 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 14);
      cursorY.set(e.clientY - 14);
    };

    const onEnterInteractive = () => scale.set(1.8);
    const onLeaveInteractive = () => scale.set(1);

    const addListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    window.addEventListener("mousemove", move);
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addListeners();

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, [cursorX, cursorY, scale]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        scale: springScale,
        width: 28,
        height: 28,
        zIndex: 9999,
        pointerEvents: "none",
        filter: "drop-shadow(0 0 4px #5cf96466)",
      }}
    >
      <LimeCursor />
    </motion.div>
  );
}
