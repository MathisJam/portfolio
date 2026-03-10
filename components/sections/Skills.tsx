"use client";

import { motion } from "motion/react";
import { languages, tools } from "@/lib/data";

const GREEN = "#5cf964";
const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

export default function Skills() {
	return (
		<section
			id="skills"
			className="relative h-screen w-full flex items-center overflow-hidden"
			style={{ scrollSnapAlign: "start", backgroundColor: "#050505" }}
		>
			<div className="w-full px-8 md:px-16 flex flex-col gap-16">

				{/* Title — centered */}
				<p
					className="text-sm md:text-base tracking-[0.3em] uppercase font-medium text-center"
					style={{ color: GREEN }}
				>
					Compétences
				</p>

				{/* Languages */}
				<div className="flex flex-col gap-5">
					<p
						className="text-[10px] tracking-[0.35em] uppercase font-medium"
						style={{ color: GREEN }}
					>
						Langages
					</p>
					<motion.div
						className="flex flex-wrap justify-end gap-x-12 gap-y-5"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.2 }}
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
					>
						{languages.map((lang) => (
							<motion.span
								key={lang.name}
								variants={{
									hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
									visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
								}}
								className="text-xl md:text-2xl font-[family-name:var(--font-holtwood)]"
								style={{ color: "#fff" }}
							>
								{lang.name}
							</motion.span>
						))}
					</motion.div>
				</div>

				{/* Divider — right-aligned */}
				<motion.div
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					viewport={{ once: false, amount: 0.8 }}
					transition={{ duration: 0.8, ease: EASE }}
					className="w-full h-px origin-right"
					style={{ backgroundColor: GREEN, opacity: 0.7 }}
				/>

				{/* Tools */}
				<div className="flex flex-col gap-5">
					<p
						className="text-[10px] tracking-[0.35em] uppercase font-medium"
						style={{ color: GREEN }}
					>
						Outils & logiciels
					</p>
					<motion.div
						className="flex flex-wrap justify-end gap-x-12 gap-y-5"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.2 }}
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
					>
						{tools.map((tool) => (
							<motion.span
								key={tool.name}
								variants={{
									hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
									visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
								}}
								className="text-xl md:text-2xl font-[family-name:var(--font-holtwood)]"
								style={{ color: "#fff" }}
							>
								{tool.name}
							</motion.span>
						))}
					</motion.div>
				</div>

			</div>
		</section>
	);
}
