import type { Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const slideFromLeft: Variants = {
	hidden: { opacity: 0, x: -40 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

export const slideFromRight: Variants = {
	hidden: { opacity: 0, x: 40 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

export const staggerContainer: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

export const popIn: Variants = {
	hidden: { opacity: 0, scale: 0.85, y: 10 },
	visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 22 } },
};
