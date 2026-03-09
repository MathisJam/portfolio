"use client";

import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SkillBadge from "@/components/ui/SkillBadge";
import { staggerContainer, fadeUp } from "@/lib/variants";
import { skills } from "@/lib/data";

const DARK = "#180c4959";
const GREEN = "#5cf964";

export default function Skills() {
	return (
		<SectionWrapper id="skills" bgColor={DARK} accentColor={GREEN}>
			<div className="flex flex-col items-center gap-10 px-6 max-w-4xl w-full">
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

				<motion.div
					className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full"
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.2 }}
				>
					{skills.map((skill) => (
						<SkillBadge key={skill.name} skill={skill} bg={DARK} accent={GREEN} />
					))}
				</motion.div>
			</div>
		</SectionWrapper>
	);
}
