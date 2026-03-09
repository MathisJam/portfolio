"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const GREEN = "#5cf964";

const M_PATH = "M 10,105 L 10,15 L 60,65 L 110,15 L 110,105";
const J_BAR = "M 125,15 L 210,15";
const J_STEM = "M 168,15 L 168,90 C 168,112 125,112 125,95";

// Small lime slice SVG for decoration
function LimeSlice({ size = 80, rotate = 0, opacity = 0.18 }: { size?: number; rotate?: number; opacity?: number }) {
	const r = size / 2;
	const segments = [0, 45, 90, 135, 180, 225, 270, 315];
	return (
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ transform: `rotate(${rotate}deg)`, opacity }}>
			<circle cx={r} cy={r} r={r - 2} fill={GREEN} opacity={0.25} />
			<circle cx={r} cy={r} r={r - 2} stroke={GREEN} strokeWidth="1.5" fill="none" />
			<circle cx={r} cy={r} r={(r - 2) * 0.62} stroke={GREEN} strokeWidth="1" fill="none" />
			{segments.map((angle, i) => {
				const rad = (angle * Math.PI) / 180;
				return (
					<line
						key={i}
						x1={r} y1={r}
						x2={r + (r - 2) * 0.62 * Math.cos(rad)}
						y2={r + (r - 2) * 0.62 * Math.sin(rad)}
						stroke={GREEN} strokeWidth="1"
					/>
				);
			})}
			<circle cx={r} cy={r} r={3} fill={GREEN} />
		</svg>
	);
}

export default function PageIntro() {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(false), 2200);
		return () => clearTimeout(timer);
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
					style={{ backgroundColor: "#150f2d" }}
					exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
				>
					{/* Background glow */}
					<div className="absolute inset-0" style={{
						background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${GREEN}14 0%, transparent 70%)`,
					}} />

					{/* Decorative lime slices — corners */}
					<motion.div className="absolute top-[-20px] left-[-20px]"
						animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
						<LimeSlice size={110} opacity={1} />
					</motion.div>
					<motion.div className="absolute bottom-[-25px] right-[-25px]"
						animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
						<LimeSlice size={130} opacity={1} />
					</motion.div>
					<motion.div className="absolute top-[15%] right-[8%]"
						animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
						<LimeSlice size={60} opacity={1} />
					</motion.div>
					<motion.div className="absolute bottom-[18%] left-[6%]"
						animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
						<LimeSlice size={70} opacity={1} />
					</motion.div>

					{/* MJ monogram */}
					<svg
						width="220" height="120"
						viewBox="0 0 220 120"
						fill="none"
						style={{ filter: `drop-shadow(0 0 14px ${GREEN}99)`, position: "relative", zIndex: 1 }}
					>
						{/* M */}
						<motion.path
							d={M_PATH}
							stroke={GREEN} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{
								pathLength: { duration: 0.85, ease: "easeInOut", delay: 0.2 },
								opacity: { duration: 0.001, delay: 0.2 },
							}}
						/>

						{/* J bar */}
						<motion.path
							d={J_BAR}
							stroke={GREEN} strokeWidth="6" strokeLinecap="round" fill="none"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{
								pathLength: { duration: 0.3, ease: "easeInOut", delay: 1.15 },
								opacity: { duration: 0.001, delay: 1.15 },
							}}
						/>

						{/* J stem */}
						<motion.path
							d={J_STEM}
							stroke={GREEN} strokeWidth="6" strokeLinecap="round" fill="none"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{
								pathLength: { duration: 0.5, ease: "easeInOut", delay: 1.3 },
								opacity: { duration: 0.001, delay: 1.3 },
							}}
						/>
					</svg>

					<motion.p
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						style={{
							color: GREEN,
							fontSize: "0.8rem",
							letterSpacing: "0.15em",
							textShadow: `0 0 10px ${GREEN}99, 0 0 24px ${GREEN}44`,
							position: "relative",
							zIndex: 1,
							marginTop: "1rem",
							opacity: 0.75,
						}}
					>
						When life gives you lemons...
					</motion.p>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
