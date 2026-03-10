"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const GREEN = "#5cf964";

const links = [
	{ label: "À propos", id: "about" },
	{ label: "Compétences", id: "skills" },
	{ label: "Projets", id: "projects" },
	{ label: "Contact", id: "contact" },
];

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Header() {
	const [open, setOpen] = useState(false);
	const [hovered, setHovered] = useState<string | null>(null);

	const scrollTo = (id: string) => {
		setOpen(false);
		setTimeout(() => {
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		}, 400);
	};

	return (
		<>
			{/* Toggle button — fixed top-left */}
			<motion.button
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 3.2, duration: 0.6, ease: EASE }}
				onClick={() => setOpen((v) => !v)}
				className="fixed top-5 left-5 z-[60] w-12 h-12 flex flex-col items-center justify-center gap-[6px] rounded-full"
				style={{
					backgroundColor: open ? `${GREEN}15` : "rgba(0, 0, 0, 0.6)",
					backdropFilter: "blur(12px)",
					border: `1px solid ${GREEN}${open ? "40" : "20"}`,
					transition: "background-color 0.3s, border-color 0.3s",
				}}
				aria-label="Menu"
			>
				{/* Animated hamburger → X */}
				<motion.span
					animate={{
						rotate: open ? 45 : 0,
						y: open ? 4 : 0,
						width: open ? 20 : 18,
					}}
					transition={{ duration: 0.35, ease: EASE }}
					style={{ height: 2, backgroundColor: GREEN, borderRadius: 2, display: "block" }}
				/>
				<motion.span
					animate={{
						opacity: open ? 0 : 1,
						scaleX: open ? 0 : 1,
					}}
					transition={{ duration: 0.2 }}
					style={{ width: 12, height: 2, backgroundColor: GREEN, borderRadius: 2, display: "block" }}
				/>
				<motion.span
					animate={{
						rotate: open ? -45 : 0,
						y: open ? -4 : 0,
						width: open ? 20 : 15,
					}}
					transition={{ duration: 0.35, ease: EASE }}
					style={{ height: 2, backgroundColor: GREEN, borderRadius: 2, display: "block", alignSelf: "center" }}
				/>
			</motion.button>

			{/* Side panel overlay */}
			<AnimatePresence>
				{open && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4 }}
							className="fixed inset-0 z-[55]"
							style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
							onClick={() => setOpen(false)}
						/>

						{/* Panel */}
						<motion.nav
							initial={{ clipPath: "circle(0% at 24px 40px)" }}
							animate={{ clipPath: "circle(150% at 24px 40px)" }}
							exit={{ clipPath: "circle(0% at 24px 40px)" }}
							transition={{ duration: 0.6, ease: EASE }}
							className="fixed top-0 left-0 z-[58] h-full flex flex-col justify-center pl-10 pr-16 sm:pl-14 sm:pr-24"
							style={{
								backgroundColor: "rgba(0, 0, 0, 0.95)",
								backdropFilter: "blur(24px)",
								borderRight: `1px solid ${GREEN}15`,
							}}
						>
							{/* Decorative vertical line */}
							<motion.div
								initial={{ scaleY: 0 }}
								animate={{ scaleY: 1 }}
								exit={{ scaleY: 0 }}
								transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
								className="absolute left-6 sm:left-10 top-[15%] bottom-[15%] w-px origin-top"
								style={{
									background: `linear-gradient(to bottom, transparent, ${GREEN}33, ${GREEN}33, transparent)`,
								}}
							/>

							<div className="flex flex-col gap-2">
								{links.map((link, i) => (
									<motion.button
										key={link.id}
										initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
										animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
										exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
										transition={{
											duration: 0.45,
											delay: 0.15 + i * 0.08,
											ease: EASE,
										}}
										onClick={() => scrollTo(link.id)}
										onMouseEnter={() => setHovered(link.id)}
										onMouseLeave={() => setHovered(null)}
										className="relative text-left py-3 pl-6 sm:pl-8 group"
									>
										{/* Hover glow bar */}
										<motion.div
											className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full"
											initial={{ height: 0, opacity: 0 }}
											animate={{
												height: hovered === link.id ? 32 : 0,
												opacity: hovered === link.id ? 1 : 0,
											}}
											transition={{ duration: 0.25, ease: EASE }}
											style={{
												backgroundColor: GREEN,
												boxShadow: `0 0 12px ${GREEN}88, 0 0 24px ${GREEN}44`,
											}}
										/>

										<span
											className="text-2xl sm:text-3xl font-[family-name:var(--font-roboto)] tracking-tight"
											style={{
												color: GREEN,
												opacity: hovered === link.id ? 1 : 0.6,
												textShadow: hovered === link.id ? `0 0 30px ${GREEN}55` : "none",
												transition: "opacity 0.3s, text-shadow 0.3s, transform 0.3s",
												transform: hovered === link.id ? "translateX(4px)" : "translateX(0)",
												display: "block",
											}}
										>
											{link.label}
										</span>
									</motion.button>
								))}
							</div>

							{/* Small lime slice decoration */}
							<motion.div
								initial={{ opacity: 0, rotate: -30 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0 }}
								transition={{ delay: 0.5, duration: 0.6 }}
								className="absolute bottom-10 right-8 w-16 h-16"
							>
								<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
									<circle cx="50" cy="50" r="47" fill={GREEN} opacity="0.3" />
									<circle cx="50" cy="50" r="38" fill={GREEN} opacity="0.15" />
									<circle cx="50" cy="50" r="47" stroke={GREEN} strokeWidth="2.5" opacity="0.55" />
									<circle cx="50" cy="50" r="38" stroke={GREEN} strokeWidth="1.5" opacity="0.5" />
									{Array.from({ length: 8 }, (_, j) => {
										const angle = (j * Math.PI * 2) / 8;
										return (
											<line key={j} x1="50" y1="50"
												x2={50 + 38 * Math.cos(angle)}
												y2={50 + 38 * Math.sin(angle)}
												stroke={GREEN} strokeWidth="1.5" opacity="0.45" />
										);
									})}
									<circle cx="50" cy="50" r="5" fill={GREEN} opacity="0.75" />
								</svg>
							</motion.div>
						</motion.nav>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
