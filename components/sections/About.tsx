"use client";

import { motion } from "motion/react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/variants";

const GREEN = "#5cf964";
const BLUE = "#180c4959";

export default function About() {
	return (
		<SectionWrapper id="about" bgColor={BLUE} accentColor={GREEN}>
			<div className="flex flex-col md:flex-row items-center gap-12 px-6 max-w-5xl w-full">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.4 }}
					variants={slideFromLeft}
					className="shrink-0"
				>
					<Image
						src="/images/profilepic.jpg"
						alt="Mathis Jameau"
						width={280}
						height={280}
						className="rounded-2xl object-cover shadow-2xl"
					/>
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.4 }}
					variants={slideFromRight}
					className="flex flex-col gap-4"
				>
					<motion.h2
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.5 }}
						variants={fadeUp}
						className="text-3xl font-[family-name:var(--font-holtwood)]"
						style={{ color: GREEN }}
					>
						À propos
					</motion.h2>
					<p className="leading-relaxed text-lg" style={{ color: GREEN, opacity: 0.85 }}>
						Étudiant à 42 Paris, je me spécialise dans le développement fullstack et la cybersécurité.
						Je m&apos;intéresse particulièrement à l&apos;OSINT, à la sécurité offensive et à la conception d&apos;applications web robustes.
						<br /><br />
						Je suis actuellement disponible pour des opportunités de stage ou d&apos;alternance.
					</p>
				</motion.div>
			</div>
		</SectionWrapper>
	);
}
