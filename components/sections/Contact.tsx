"use client";

import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { staggerContainer, fadeUp } from "@/lib/variants";
import { social } from "@/lib/data";

const DARK = "#180c4959";
const GREEN = "#5cf964";

export default function Contact() {
	return (
		<SectionWrapper id="contact" bgColor={DARK} accentColor={GREEN}>
			<motion.div
				className="flex flex-col items-center gap-8 text-center px-4"
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.4 }}
			>
				<motion.h2
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.5 }}
					variants={fadeUp}
					className="text-3xl font-[family-name:var(--font-holtwood)]"
					style={{ color: GREEN }}
				>
					Contact
				</motion.h2>

				<motion.p
					variants={fadeUp}
					className="max-w-sm text-lg"
					style={{ color: GREEN, opacity: 0.8 }}
				>
					Envie de collaborer ou d&apos;en savoir plus ? Retrouvez-moi ici :
				</motion.p>

				<motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-8">
					<motion.a
						href={`mailto:${social.email}`}
						className="font-semibold text-sm tracking-widest uppercase"
						style={{ color: GREEN, borderBottom: "2px solid transparent" }}
						whileHover={{ y: -2, borderBottomColor: GREEN }}
						whileTap={{ scale: 0.97 }}
						transition={{ duration: 0.15 }}
					>
						Email ↗
					</motion.a>
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
