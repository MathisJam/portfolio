"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

interface FlowingMenuProps {
	items: { link: string; text: string; image: string; description?: string }[];
	speed?: number;
	textColor?: string;
	bgColor?: string;
	marqueeBgColor?: string;
	marqueeTextColor?: string;
	borderColor?: string;
}

export default function FlowingMenu({
	items = [],
	speed = 15,
	textColor = "#fff",
	bgColor = "#060010",
	marqueeBgColor = "#fff",
	marqueeTextColor = "#060010",
	borderColor = "#fff",
}: FlowingMenuProps) {
	return (
		<div style={{ width: "100%", height: "100%", overflow: "hidden", backgroundColor: bgColor }}>
			<nav style={{ display: "flex", flexDirection: "column", height: "100%", margin: 0, padding: 0 }}>
				{items.map((item, idx) => (
					<MenuItem
						key={idx}
						link={item.link}
						text={item.text}
						image={item.image}
						description={item.description}
						speed={speed}
						textColor={textColor}
						marqueeBgColor={marqueeBgColor}
						marqueeTextColor={marqueeTextColor}
						borderColor={borderColor}
					/>
				))}
			</nav>
		</div>
	);
}

interface MenuItemProps {
	link: string;
	text: string;
	image: string;
	description?: string;
	speed: number;
	textColor: string;
	marqueeBgColor: string;
	marqueeTextColor: string;
	borderColor: string;
}

function MenuItem({ link, text, image, description, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor }: MenuItemProps) {
	const itemRef = useRef<HTMLDivElement>(null);
	const marqueeRef = useRef<HTMLDivElement>(null);
	const marqueeInnerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<gsap.core.Tween | null>(null);
	const [repetitions, setRepetitions] = useState(4);

	const animationDefaults = { duration: 0.6, ease: "expo" };

	const distMetric = (x: number, y: number, x2: number, y2: number) => {
		const xDiff = x - x2;
		const yDiff = y - y2;
		return xDiff * xDiff + yDiff * yDiff;
	};

	const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
		const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
		const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
		return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
	};

	useEffect(() => {
		const calculateRepetitions = () => {
			if (!marqueeInnerRef.current) return;
			const marqueeContent = marqueeInnerRef.current.querySelector(".marquee__part") as HTMLElement;
			if (!marqueeContent) return;
			const contentWidth = marqueeContent.offsetWidth;
			const viewportWidth = window.innerWidth;
			const needed = Math.ceil(viewportWidth / contentWidth) + 2;
			setRepetitions(Math.max(4, needed));
		};
		calculateRepetitions();
		window.addEventListener("resize", calculateRepetitions);
		return () => window.removeEventListener("resize", calculateRepetitions);
	}, [text, image]);

	useEffect(() => {
		const setupMarquee = () => {
			if (!marqueeInnerRef.current) return;
			const marqueeContent = marqueeInnerRef.current.querySelector(".marquee__part") as HTMLElement;
			if (!marqueeContent) return;
			const contentWidth = marqueeContent.offsetWidth;
			if (contentWidth === 0) return;
			if (animationRef.current) animationRef.current.kill();
			animationRef.current = gsap.to(marqueeInnerRef.current, {
				x: -contentWidth,
				duration: speed,
				ease: "none",
				repeat: -1,
			});
		};
		const timer = setTimeout(setupMarquee, 50);
		return () => {
			clearTimeout(timer);
			if (animationRef.current) animationRef.current.kill();
		};
	}, [text, image, repetitions, speed]);

	const handleMouseEnter = useCallback((ev: React.MouseEvent) => {
		if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
		const rect = itemRef.current.getBoundingClientRect();
		const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
		gsap
			.timeline({ defaults: animationDefaults })
			.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
			.set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
			.to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
	}, []);

	const handleMouseLeave = useCallback((ev: React.MouseEvent) => {
		if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
		const rect = itemRef.current.getBoundingClientRect();
		const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
		gsap
			.timeline({ defaults: animationDefaults })
			.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
			.to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
	}, []);

	return (
		<div
			ref={itemRef}
			style={{
				flex: 1,
				position: "relative",
				overflow: "hidden",
				textAlign: "center",
				borderTop: `1px solid ${borderColor}`,
			}}
		>
			<a
				href={link}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					height: "100%",
					position: "relative",
					cursor: "pointer",
					textDecoration: "none",
					color: textColor,
					padding: "0 4vw",
					gap: "2vw",
				}}
			>
				<span style={{
					textTransform: "uppercase",
					fontWeight: 600,
					fontSize: "4vh",
					whiteSpace: "nowrap",
				}}>
					{text}
				</span>
				{description && (
					<span style={{
						fontSize: "1.4vh",
						color: "#5cf964",
						opacity: 0.85,
						maxWidth: "55%",
						lineHeight: 1.5,
						textAlign: "right",
						overflow: "hidden",
						display: "-webkit-box",
						WebkitLineClamp: 4,
						WebkitBoxOrient: "vertical" as const,
					}}>
						{description}
					</span>
				)}
			</a>

			<div
				ref={marqueeRef}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					overflow: "hidden",
					width: "100%",
					height: "100%",
					pointerEvents: "none",
					transform: "translate3d(0, 101%, 0)",
					backgroundColor: marqueeBgColor,
				}}
			>
				<div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
					<div
						ref={marqueeInnerRef}
						aria-hidden="true"
						style={{
							display: "flex",
							alignItems: "center",
							position: "relative",
							height: "100%",
							width: "fit-content",
							willChange: "transform",
						}}
					>
						{[...Array(repetitions)].map((_, idx) => (
							<div
								key={idx}
								className="marquee__part"
								style={{
									display: "flex",
									alignItems: "center",
									flexShrink: 0,
									color: marqueeTextColor,
								}}
							>
								<span
									style={{
										whiteSpace: "nowrap",
										textTransform: "uppercase",
										fontWeight: 400,
										fontSize: "4vh",
										lineHeight: 1,
										padding: "0 1vw",
									}}
								>
									{text}
								</span>
								<div
									style={{
										width: 200,
										height: "7vh",
										margin: "2em 2vw",
										padding: "1em 0",
										borderRadius: 50,
										backgroundSize: "cover",
										backgroundPosition: "50% 50%",
										backgroundImage: `url(${image})`,
									}}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
