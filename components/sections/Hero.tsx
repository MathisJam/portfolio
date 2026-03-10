"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { social } from "@/lib/data";

const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

const GREEN = "#5cf964";
const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];
const INTRO_DURATION = 3100;

const letterVariants: Variants = {
	hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
	visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

const nameStagger: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } },
};

const fade: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

export default function Hero() {
	const name = "Mathis Jameau";
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setReady(true), INTRO_DURATION);
		return () => clearTimeout(t);
	}, []);

	const anim = ready ? "visible" : "hidden";

	return (
		<section
			id="hero"
			className="relative h-screen w-full flex items-center justify-center overflow-hidden"
			style={{ scrollSnapAlign: "start", backgroundColor: "#000" }}
		>
			{/* Three.js Beams background */}
			<Beams
				beamWidth={3}
				beamHeight={30}
				beamNumber={20}
				lightColor={GREEN}
				speed={2}
				noiseIntensity={1.75}
				scale={0.2}
				rotation={30}
			/>

			{/* Content — centered */}
			<div className="relative z-10 w-full px-6 md:px-16">
				<motion.div className="flex flex-col items-center text-center gap-5">

					<motion.p
						variants={fade}
						initial="hidden"
						animate={anim}
						transition={{ duration: 0.8, ease: EASE }}
						className="text-xs tracking-[0.3em] uppercase font-medium"
						style={{ color: GREEN }}
					>
						Développeur fullstack
					</motion.p>

					<motion.h1
						className="text-[2rem] sm:text-6xl md:text-8xl font-[family-name:var(--font-holtwood)] leading-[0.95] whitespace-nowrap"
						style={{ color: "#fff" }}
						variants={nameStagger}
						initial="hidden"
						animate={anim}
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
						variants={fade}
						initial="hidden"
						animate={anim}
						transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
						className="text-base md:text-lg max-w-lg leading-relaxed"
						style={{ color: "rgba(255,255,255,0.6)" }}
					>
						Étudiant à 42 Paris — Cybersécurité, OSINT & développement web.
					</motion.p>

					<motion.div
						variants={fade}
						initial="hidden"
						animate={anim}
						transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
						className="flex items-center justify-center gap-8 mt-4"
					>
						{[
							{ label: "GitHub", href: social.github },
							{ label: "LinkedIn", href: social.linkedin },
							{ label: "Mon CV", href: "/CV-Mathis Jameau.pdf", download: true },
						].map((link) => (
							<motion.a
								key={link.label}
								href={link.href}
								target={link.download ? undefined : "_blank"}
								rel={link.download ? undefined : "noopener noreferrer"}
								download={link.download || undefined}
								className="text-xs tracking-[0.2em] uppercase font-medium"
								style={{ color: GREEN }}
								whileHover={{ opacity: 1 }}
								transition={{ duration: 0.2 }}
							>
								{link.label}
							</motion.a>
						))}
					</motion.div>

				</motion.div>
			</div>
		</section>
	);
}
