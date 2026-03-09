"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const GREEN = "#5cf964";

export default function PageIntro() {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(false), 1800);
		return () => clearTimeout(timer);
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center"
					style={{ backgroundColor: "#0d0d0d" }}
					exit={{
						y: "-100%",
						transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
					}}
				>
					<motion.h1
						className="text-5xl md:text-7xl font-[family-name:var(--font-holtwood)] tracking-tight"
						style={{ color: GREEN }}
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } }}
						exit={{ opacity: 0, transition: { duration: 0.2 } }}
					>
						Mathis Jameau
					</motion.h1>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
