"use client";

import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectCarousel from "@/components/ui/ProjectCarousel";
import { fadeUp } from "@/lib/variants";

const GREEN = "#5cf964";
const DARK = "#180c4959";

export default function Projects() {
	return (
		<SectionWrapper id="projects" bgColor={DARK} accentColor={GREEN}>
			<div className="flex flex-col items-center gap-8 w-full max-w-5xl px-6">
				<motion.h2
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.5 }}
					variants={fadeUp}
					className="text-3xl font-[family-name:var(--font-holtwood)]"
					style={{ color: GREEN }}
				>
					Projets
				</motion.h2>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: false, amount: 0.2 }}
					transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
					className="w-full flex justify-center"
				>
					<ProjectCarousel accentColor={GREEN} />
				</motion.div>
			</div>
		</SectionWrapper>
	);
}
