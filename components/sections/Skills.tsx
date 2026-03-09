"use client";

import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp } from "@/lib/variants";
import { languages, tools } from "@/lib/data";

const DARK = "#180c4959";
const GREEN = "#5cf964";

export default function Skills() {
	return (
		<SectionWrapper id="skills" bgColor={DARK} accentColor={GREEN}>
			<div className="flex flex-col items-center gap-12 px-6 max-w-3xl w-full">
				<motion.h2
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.5 }}
					variants={fadeUp}
					className="text-3xl font-[family-name:var(--font-holtwood)]"
					style={{ color: GREEN }}
				>
					Compétences
				</motion.h2>

				{/* Languages */}
				<div className="w-full flex flex-col gap-4">
					<motion.p
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.5 }}
						variants={fadeUp}
						className="text-xs font-semibold tracking-[0.25em] uppercase"
						style={{ color: GREEN, opacity: 0.6 }}
					>
						Langages
					</motion.p>
					<motion.div
						className="flex flex-wrap gap-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.2 }}
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
					>
						{languages.map((lang) => (
							<motion.span
								key={lang.name}
								variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
								className="text-sm font-semibold"
								style={{ color: GREEN }}
							>
								{lang.name}
							</motion.span>
						))}
					</motion.div>
				</div>

				{/* Divider */}
				<motion.div
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					viewport={{ once: false, amount: 0.8 }}
					transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
					className="w-full h-px origin-left"
					style={{ backgroundColor: `${GREEN}22` }}
				/>

				{/* Tools */}
				<div className="w-full flex flex-col gap-4">
					<motion.p
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.5 }}
						variants={fadeUp}
						className="text-xs font-semibold tracking-[0.25em] uppercase"
						style={{ color: GREEN, opacity: 0.6 }}
					>
						Outils & logiciels
					</motion.p>
					<motion.div
						className="flex flex-wrap gap-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.2 }}
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
					>
						{tools.map((tool) => (
							<motion.span
								key={tool.name}
								variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
								className="text-sm font-semibold"
								style={{ color: GREEN }}
							>
								{tool.name}
							</motion.span>
						))}
					</motion.div>
				</div>
			</div>
		</SectionWrapper>
	);
}
