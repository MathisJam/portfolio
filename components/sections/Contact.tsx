"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/variants";
import { social } from "@/lib/data";

const GREEN = "#5cf964";

export default function Contact() {
	return (
		<section
			id="contact"
			className="relative h-screen w-full flex items-center justify-center overflow-hidden"
			style={{ scrollSnapAlign: "start", backgroundColor: "#000" }}
		>
			{/* Subtle halo */}
			<div className="absolute inset-0 pointer-events-none" style={{
				background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(41, 255, 112, 0.19) 10%, transparent 90%)",
			}} />

			<motion.div
				className="w-full px-8 md:px-16 flex flex-col items-center text-center gap-10 max-w-3xl mx-auto"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.4 }}
			>

				<p
					className="text-sm md:text-base tracking-[0.3em] uppercase font-medium"
					style={{ color: GREEN }}
				>
					Contact
				</p>

				<motion.h2
					variants={fadeUp}
					className="text-4xl md:text-6xl font-[family-name:var(--font-holtwood)] leading-tight"
					style={{ color: "#fff" }}
				>
					Travaillons ensemble
				</motion.h2>

				<motion.p
					variants={fadeUp}
					className="text-base md:text-lg leading-relaxed max-w-md"
					style={{ color: "rgba(255,255,255,0.5)" }}
				>
					Disponible pour un stage ou une alternance, n&apos;hésitez pas à me contacter.
				</motion.p>

				<motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-8 mt-4">
					{[
						{ label: "Email", href: `mailto:${social.email}` },
						{ label: "GitHub", href: social.github, external: true },
						{ label: "LinkedIn", href: social.linkedin, external: true },
					].map((link) => (
						<motion.a
							key={link.label}
							href={link.href}
							target={link.external ? "_blank" : undefined}
							rel={link.external ? "noopener noreferrer" : undefined}
							className="text-sm tracking-[0.15em] uppercase font-medium"
							style={{ color: GREEN }}
							whileHover={{ opacity: 0.7 }}
							transition={{ duration: 0.2 }}
						>
							{link.label} ↗
						</motion.a>
					))}
				</motion.div>

			</motion.div>
		</section>
	);
}
