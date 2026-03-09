"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "@/lib/data";

const GREEN = "#5cf964";

interface ProjectCarouselProps {
	accentColor: string;
}

export default function ProjectCarousel({ accentColor }: ProjectCarouselProps) {
	const [projectIndex, setProjectIndex] = useState(0);
	const [imgIndex, setImgIndex] = useState(0);
	const [imgDir, setImgDir] = useState(1);

	const project = projects[projectIndex];
	const images = project.images ?? [];

	const goImg = (next: number) => {
		setImgDir(next > imgIndex ? 1 : -1);
		setImgIndex(next);
	};
	const prevImg = () => goImg((imgIndex - 1 + images.length) % images.length);
	const nextImg = () => goImg((imgIndex + 1) % images.length);

	const goProject = (next: number) => {
		setProjectIndex(next);
		setImgIndex(0);
		setImgDir(1);
	};

	const imgVariants = {
		enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
		center: { x: 0, opacity: 1 },
		exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
	};

	return (
		<div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">
			{/* Card */}
			<div
				className="w-full rounded-2xl overflow-hidden flex flex-col"
				style={{ border: `1px solid ${accentColor}55`, backgroundColor: "#150f2d" }}
			>
				{/* Image gallery */}
				{images.length > 0 && (
					<div className="relative w-full" style={{ height: 260 }}>
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
									className="object-contain"
									sizes="(max-width: 768px) 100vw, 672px"
								/>
							</motion.div>
						</AnimatePresence>

						{/* Image arrows */}
						{images.length > 1 && (
							<>
								<button
									onClick={prevImg}
									className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold z-10"
									style={{
										backgroundColor: "#180c4959",
										border: `1.5px solid ${accentColor}88`,
										color: accentColor,
									}}
								>
									←
								</button>
								<button
									onClick={nextImg}
									className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold z-10"
									style={{
										backgroundColor: "#180c4959",
										border: `1.5px solid ${accentColor}88`,
										color: accentColor,
									}}
								>
									→
								</button>

								{/* Image dots */}
								<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
									{images.map((_, i) => (
										<button
											key={i}
											onClick={() => goImg(i)}
											className="rounded-full transition-all duration-300"
											style={{
												width: i === imgIndex ? 20 : 8,
												height: 8,
												backgroundColor: i === imgIndex ? accentColor : accentColor + "55",
											}}
										/>
									))}
								</div>
							</>
						)}
					</div>
				)}

				{/* Info */}
				<div className="flex flex-col gap-3 p-6">
					<h3 className="text-2xl font-[family-name:var(--font-holtwood)] text-center" style={{ color: GREEN }}>
						{project.title}
					</h3>

					<p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: GREEN, opacity: 1 }}>
						{project.description}
					</p>

					<div className="flex gap-2 flex-wrap">
						{project.tags.map((tag) => (
							<span
								key={tag}
								className="text-xs font-semibold"
								style={{ color: GREEN, opacity: 1 }}
							>
								{tag}
							</span>
						))}
					</div>

					{project.link && project.link !== "#" && (
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-semibold tracking-wide w-fit"
							style={{ color: GREEN, borderBottom: `1.5px solid ${GREEN}88` }}
						>
							Voir le code ↗
						</a>
					)}
				</div>
			</div>

			{/* Project navigation (only when multiple projects) */}
			{projects.length > 1 && (
				<div className="flex items-center gap-5">
					<motion.button
						onClick={() => goProject((projectIndex - 1 + projects.length) % projects.length)}
						whileHover={{ scale: 1.12 }}
						whileTap={{ scale: 0.92 }}
						className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg"
						style={{ border: `2px solid ${accentColor}`, color: accentColor }}
					>
						←
					</motion.button>
					<div className="flex gap-2 items-center">
						{projects.map((_, i) => (
							<motion.button
								key={i}
								onClick={() => goProject(i)}
								animate={{ width: i === projectIndex ? 24 : 10, opacity: i === projectIndex ? 1 : 0.4 }}
								transition={{ duration: 0.3 }}
								className="h-2.5 rounded-full"
								style={{ backgroundColor: accentColor }}
							/>
						))}
					</div>
					<motion.button
						onClick={() => goProject((projectIndex + 1) % projects.length)}
						whileHover={{ scale: 1.12 }}
						whileTap={{ scale: 0.92 }}
						className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg"
						style={{ border: `2px solid ${accentColor}`, color: accentColor }}
					>
						→
					</motion.button>
				</div>
			)}
		</div>
	);
}
