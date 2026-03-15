"use client";

import { motion } from "motion/react";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/variants";

const GREEN = "#5cf964";

export default function About() {
	return (
		<section
			id="about"
			className="relative h-screen w-full flex overflow-hidden"
			style={{ scrollSnapAlign: "start", backgroundColor: "#050505" }}
		>
			{/* Subtle halo */}
			<div className="hidden md:block absolute inset-0 pointer-events-none" style={{
				background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(39, 249, 50, 0.16) 0%, transparent 90%)",
			}} />

			{/* Image — full height left column */}
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.3 }}
				variants={slideFromLeft}
				className="hidden md:block relative w-[40%] shrink-0 h-full"
			>
				<img
					src="/images/profilepic.jpg"
					alt="Mathis Jameau"
					className="w-full h-full object-cover"
				/>
				<div
					className="absolute inset-0"
					style={{ background: "linear-gradient(to right, transparent 60%, #050505 100%)" }}
				/>
			</motion.div>

			{/* Text — right side, vertically centered, text centered */}
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.4 }}
				variants={slideFromRight}
				className="flex flex-col justify-center items-center text-center gap-6 px-8 md:px-16 py-16 md:py-0 w-full md:w-[60%]"
			>
				<p
					className="text-sm md:text-base tracking-[0.3em] uppercase font-medium"
					style={{ color: GREEN }}
				>
					À propos
				</p>

				<h2
					className="text-3xl md:text-5xl font-[family-name:var(--font-holtwood)] leading-tight"
					style={{ color: "#fff" }}
				>
					Qui suis-je ?
				</h2>

				<p className="leading-relaxed text-base md:text-lg max-w-lg" style={{ color: "rgba(255,255,255,0.6)" }}>
					Étudiant à 42 Paris et développeur fullstack,
					je m&apos;intéresse à tout ce qui touche à la cybersécurité,
					de l&apos;OSINT à la sécurité offensive en passant par les CTF.
				</p>

				<p className="leading-relaxed text-base md:text-lg max-w-lg" style={{ color: "rgba(255,255,255,0.6)" }}>
					Ce qui me plaît dans ce métier c&apos;est de pouvoir apprendre
					quelque chose de nouveau chaque jour. Curieux de nature,
					j&apos;aime autant construire et créer que chercher les failles
					d&apos;un code ou d&apos;un système pour l&apos;améliorer.
				</p>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false }}
					variants={fadeUp}
				>
					<p className="text-sm font-medium" style={{ color: GREEN }}>
						Disponible pour un stage ou une alternance.
					</p>
				</motion.div>
			</motion.div>

			{/* Mobile: image as background */}
			<div
				className="md:hidden absolute inset-0 opacity-20"
				style={{
					backgroundImage: "url(/images/profilepic.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
		</section>
	);
}
