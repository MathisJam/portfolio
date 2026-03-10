"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const GREEN = "#5cf964";

interface Project {
	title: string;
	description: string;
	link: string;
	tags: string[];
	images: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
	const images = project.images ?? [];
	const [imgIndex, setImgIndex] = useState(0);
	const [imgDir, setImgDir] = useState(1);
	const [hovered, setHovered] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
	const cardRef = useRef<HTMLDivElement>(null);

	const goImg = (next: number) => {
		setImgDir(next > imgIndex ? 1 : -1);
		setImgIndex(next);
	};
	const prevImg = (e: React.MouseEvent) => {
		e.stopPropagation();
		goImg((imgIndex - 1 + images.length) % images.length);
	};
	const nextImg = (e: React.MouseEvent) => {
		e.stopPropagation();
		goImg((imgIndex + 1) % images.length);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		const card = cardRef.current;
		if (!card) return;
		const rect = card.getBoundingClientRect();
		setMousePos({
			x: ((e.clientX - rect.left) / rect.width) * 100,
			y: ((e.clientY - rect.top) / rect.height) * 100,
		});
	};

	const imgVariants = {
		enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
		center: { x: 0, opacity: 1 },
		exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
	};

	/* ── Image gallery (shared between mobile & desktop) ── */
	const imageGallery = images.length > 0 && (
		<div className="relative w-full h-full">
			<AnimatePresence custom={imgDir} mode="wait">
				<motion.div
					key={imgIndex}
					custom={imgDir}
					variants={imgVariants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ duration: 0.35, ease: "easeInOut" }}
					className="absolute inset-0"
				>
					<Image
						src={images[imgIndex]}
						alt={`${project.title} screenshot ${imgIndex + 1}`}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 50vw"
					/>
				</motion.div>
			</AnimatePresence>

			{/* Arrows + dots (always visible on mobile, hover-only on desktop) */}
			{images.length > 1 && (
				<div className={`absolute inset-0 z-10 ${hovered ? "opacity-100" : "md:opacity-0"} transition-opacity duration-300`}>
					<button
						onClick={prevImg}
						className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
						style={{
							backgroundColor: "rgba(10, 4, 30, 0.7)",
							backdropFilter: "blur(8px)",
							border: `1px solid ${GREEN}55`,
							color: GREEN,
						}}
					>
						←
					</button>
					<button
						onClick={nextImg}
						className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
						style={{
							backgroundColor: "rgba(10, 4, 30, 0.7)",
							backdropFilter: "blur(8px)",
							border: `1px solid ${GREEN}55`,
							color: GREEN,
						}}
					>
						→
					</button>
					<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
						{images.map((_, i) => (
							<button
								key={i}
								onClick={(e) => { e.stopPropagation(); goImg(i); }}
								className="rounded-full transition-all duration-300"
								style={{
									width: i === imgIndex ? 18 : 7,
									height: 7,
									backgroundColor: i === imgIndex ? GREEN : `${GREEN}55`,
									boxShadow: i === imgIndex ? `0 0 8px ${GREEN}66` : "none",
								}}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);

	/* ── Text content (shared) ── */
	const textContent = (
		<div className="flex flex-col gap-2">
			<h3
				className="text-lg md:text-xl font-[family-name:var(--font-holtwood)]"
				style={{ color: GREEN, textShadow: `0 0 20px ${GREEN}44` }}
			>
				{project.title}
			</h3>

			<p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: GREEN, opacity: 0.85 }}>
				{project.description}
			</p>

			<div className="flex gap-3 flex-wrap pt-1">
				{project.tags.map((tag) => (
					<span key={tag} className="text-xs font-semibold" style={{ color: GREEN, opacity: 0.6 }}>
						{tag}
					</span>
				))}
			</div>

			{project.link && project.link !== "#" && (
				<a
					href={project.link}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm font-semibold tracking-wide w-fit mt-1"
					style={{
						color: GREEN,
						borderBottom: `1.5px solid ${GREEN}88`,
						textShadow: `0 0 12px ${GREEN}44`,
					}}
				>
					Voir le code ↗
				</a>
			)}
		</div>
	);

	return (
		<>
			{/* ═══ MOBILE: stacked card (no hover needed) ═══ */}
			<div
				className="md:hidden rounded-2xl overflow-hidden flex flex-col"
				style={{
					border: `1px solid ${GREEN}22`,
					backgroundColor: "#150f2d",
					boxShadow: `0 4px 20px -5px rgba(0,0,0,0.3)`,
				}}
			>
				<div className="relative w-full" style={{ height: 200 }}>
					{imageGallery}
				</div>
				<div className="p-4">
					{textContent}
				</div>
			</div>

			{/* ═══ DESKTOP: hover overlay card ═══ */}
			<motion.div
				ref={cardRef}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onMouseMove={handleMouseMove}
				animate={{
					scale: hovered ? 1.03 : 1,
					y: hovered ? -8 : 0,
				}}
				transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
				className="hidden md:block relative rounded-2xl overflow-hidden cursor-pointer"
				style={{
					height: 380,
					border: `1px solid ${GREEN}${hovered ? "55" : "22"}`,
					boxShadow: hovered
						? `0 20px 60px -15px ${GREEN}25, 0 0 30px -10px ${GREEN}15`
						: "0 4px 20px -5px rgba(0,0,0,0.3)",
					transition: "border-color 0.35s, box-shadow 0.35s",
				}}
			>
				{/* Image — full card background */}
				<div className="absolute inset-0">
					{imageGallery}
				</div>

				{/* Mouse-following glow */}
				<motion.div
					className="absolute inset-0 pointer-events-none z-10"
					animate={{ opacity: hovered ? 1 : 0 }}
					transition={{ duration: 0.3 }}
					style={{
						background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, ${GREEN}20, transparent)`,
					}}
				/>

				{/* Bottom gradient — always visible */}
				<div
					className="absolute inset-0 z-20 pointer-events-none"
					style={{
						background: `linear-gradient(to top, rgba(10, 4, 30, 0.95) 0%, rgba(10, 4, 30, 0.6) 35%, transparent 65%)`,
					}}
				/>

				{/* Title + tags — visible when not hovered */}
				<motion.div
					className="absolute bottom-0 left-0 right-0 z-30 p-5 flex flex-col gap-2"
					animate={{ opacity: hovered ? 0 : 1 }}
					transition={{ duration: 0.2 }}
				>
					<h3
						className="text-xl font-[family-name:var(--font-holtwood)]"
						style={{ color: GREEN, textShadow: `0 0 20px ${GREEN}44` }}
					>
						{project.title}
					</h3>
					<div className="flex gap-3 flex-wrap">
						{project.tags.map((tag) => (
							<span key={tag} className="text-xs font-semibold" style={{ color: GREEN, opacity: 0.6 }}>
								{tag}
							</span>
						))}
					</div>
				</motion.div>

				{/* Hover overlay — full description */}
				<motion.div
					className="absolute inset-0 z-30 flex flex-col justify-end p-5"
					initial={false}
					animate={{ opacity: hovered ? 1 : 0 }}
					transition={{ duration: 0.35 }}
					style={{
						background: `linear-gradient(to top, rgba(10, 4, 30, 0.97) 0%, rgba(10, 4, 30, 0.85) 50%, rgba(10, 4, 30, 0.4) 100%)`,
						pointerEvents: hovered ? "auto" : "none",
					}}
				>
					<motion.div
						animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
						transition={{ duration: 0.35, delay: hovered ? 0.05 : 0 }}
					>
						{textContent}
					</motion.div>
				</motion.div>
			</motion.div>
		</>
	);
}
