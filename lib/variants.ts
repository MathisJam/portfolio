import type { Variants } from "motion/react";

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const slideFromLeft: Variants = {
	hidden: { opacity: 0, x: -70 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const slideFromRight: Variants = {
	hidden: { opacity: 0, x: 70 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.75 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const popIn: Variants = {
	hidden: { opacity: 0, scale: 0.6, y: 20 },
	visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 18 } },
};
