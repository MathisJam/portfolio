"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, staggerContainer } from "@/lib/variants";
import { social } from "@/lib/data";

const DARK = "#180c4959";
const GREEN = "#5cf964";

const letterVariants: Variants = {
	hidden: { opacity: 0, y: 50, rotate: -8 },
	visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring" as const, stiffness: 200, damping: 18 } },
};

const nameStagger = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.045, delayChildren: 0.3 } },
};

export default function Hero() {
	const name = "Mathis Jameau";

	return (
		<SectionWrapper id="hero" bgColor={DARK} accentColor={GREEN}>
			<motion.div
				className="flex flex-col items-center gap-5 text-center px-4"
			>
				<motion.p
					variants={fadeUp}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.2 }}
					className="text-sm tracking-widest uppercase font-semibold"
					style={{ color: GREEN }}
				>
					Développeur
				</motion.p>

				<motion.h1
					className="text-5xl md:text-7xl font-[family-name:var(--font-holtwood)]"
					style={{ color: GREEN }}
					variants={nameStagger}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.2 }}
				>
					{Array.from(name).map((char, i) => (
						<motion.span
							key={i}
							variants={letterVariants}
							style={{ display: "inline-block", whiteSpace: "pre" }}
						>
							{char}
						</motion.span>
					))}
				</motion.h1>

				<motion.p
					variants={fadeUp}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.2 }}
					className="text-lg max-w-md"
					style={{ color: GREEN, opacity: 0.85 }}
				>
					Étudiant en informatique passionné par le développement logiciel.
				</motion.p>

				<motion.div
					variants={fadeUp}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.2 }}
					className="flex gap-8"
				>
					<motion.a
						href={social.github}
						target="_blank"
						rel="noopener noreferrer"
						className="font-semibold text-sm tracking-widest uppercase"
						style={{ color: GREEN, borderBottom: "2px solid transparent" }}
						whileHover={{ y: -2, borderBottomColor: GREEN }}
						whileTap={{ scale: 0.97 }}
						transition={{ duration: 0.15 }}
					>
						GitHub ↗
					</motion.a>
					<motion.a
						href={social.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="font-semibold text-sm tracking-widest uppercase"
						style={{ color: GREEN, borderBottom: "2px solid transparent" }}
						whileHover={{ y: -2, borderBottomColor: GREEN }}
						whileTap={{ scale: 0.97 }}
						transition={{ duration: 0.15 }}
					>
						LinkedIn ↗
					</motion.a>
				</motion.div>
			</motion.div>
		</SectionWrapper>
	);
}
