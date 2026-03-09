"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "motion/react";

// ─── SVG Shapes ──────────────────────────────────────────────────────────────

const Flower = ({ color }: { color: string }) => (
	<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
		{[0, 60, 120, 180, 240, 300].map((angle) => (
			<ellipse key={angle} cx="50" cy="24" rx="10" ry="22"
				fill={color} opacity="0.55"
				transform={`rotate(${angle}, 50, 50)`} />
		))}
		<circle cx="50" cy="50" r="13" fill={color} opacity="0.85" />
	</svg>
);

const Sparkle = ({ color }: { color: string }) => (
	<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
		<path d="M50 4 L56 44 L96 50 L56 56 L50 96 L44 56 L4 50 L44 44 Z"
			fill={color} opacity="0.65" />
	</svg>
);

const LimeSlice = ({ color }: { color: string }) => {
	const cx = 50, cy = 50, r = 38;
	const lines = Array.from({ length: 8 }, (_, i) => {
		const angle = (i * Math.PI * 2) / 8;
		return { x2: cx + r * Math.cos(angle), y2: cy + r * Math.sin(angle) };
	});
	return (
		<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
			<circle cx={cx} cy={cy} r="47" fill={color} opacity="0.3" />
			<circle cx={cx} cy={cy} r={r} fill={color} opacity="0.15" />
			<circle cx={cx} cy={cy} r="47" stroke={color} strokeWidth="2.5" opacity="0.55" />
			<circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth="1.5" opacity="0.5" />
			{lines.map((l, i) => (
				<line key={i} x1={cx} y1={cy} x2={l.x2} y2={l.y2}
					stroke={color} strokeWidth="1.5" opacity="0.45" />
			))}
			<circle cx={cx} cy={cy} r="5" fill={color} opacity="0.75" />
		</svg>
	);
};

const Ring = ({ color }: { color: string }) => (
	<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
		<circle cx="50" cy="50" r="44" stroke={color} strokeWidth="4" opacity="0.5" />
		<circle cx="50" cy="50" r="32" stroke={color} strokeWidth="2" opacity="0.3" />
		<circle cx="50" cy="50" r="6" fill={color} opacity="0.6" />
	</svg>
);

type ShapeType = "flower" | "sparkle" | "limeslice" | "ring";

interface FloatingEl {
	shape: ShapeType;
	top: string;
	left: string;
	size: number;
	floatY: number;
	rotateDeg: number;
	duration: number;
	delay: number;
}

const floatingElements: FloatingEl[] = [
	{ shape: "flower", top: "6%", left: "5%", size: 64, floatY: 20, rotateDeg: 360, duration: 18, delay: 0 },
	{ shape: "sparkle", top: "10%", left: "83%", size: 48, floatY: 15, rotateDeg: 180, duration: 14, delay: 1 },
	{ shape: "limeslice", top: "78%", left: "7%", size: 58, floatY: 22, rotateDeg: 360, duration: 20, delay: 0.5 },
	{ shape: "sparkle", top: "43%", left: "91%", size: 38, floatY: 25, rotateDeg: 180, duration: 16, delay: 1.5 },
	{ shape: "limeslice", top: "44%", left: "2%", size: 50, floatY: 20, rotateDeg: 360, duration: 19, delay: 3 },
	{ shape: "flower", top: "2%", left: "46%", size: 34, floatY: 12, rotateDeg: 360, duration: 12, delay: 2 },
	{ shape: "limeslice", top: "75%", left: "82%", size: 52, floatY: 18, rotateDeg: 360, duration: 22, delay: 1 },
	{ shape: "sparkle", top: "85%", left: "44%", size: 40, floatY: 16, rotateDeg: 180, duration: 17, delay: 0.8 },
	{ shape: "flower", top: "20%", left: "20%", size: 44, floatY: 18, rotateDeg: 270, duration: 21, delay: 0.3 },
	{ shape: "ring", top: "60%", left: "55%", size: 56, floatY: 14, rotateDeg: 180, duration: 15, delay: 2.2 },
	{ shape: "flower", top: "88%", left: "65%", size: 36, floatY: 20, rotateDeg: 360, duration: 23, delay: 1.8 },
	{ shape: "ring", top: "30%", left: "70%", size: 42, floatY: 16, rotateDeg: 90, duration: 13, delay: 0.7 },
	{ shape: "flower", top: "55%", left: "30%", size: 30, floatY: 22, rotateDeg: 360, duration: 16, delay: 3.5 },
	{ shape: "sparkle", top: "15%", left: "60%", size: 28, floatY: 10, rotateDeg: 180, duration: 11, delay: 1.2 },
	{ shape: "flower", top: "70%", left: "40%", size: 48, floatY: 18, rotateDeg: 270, duration: 19, delay: 2.8 },
	{ shape: "limeslice", top: "35%", left: "15%", size: 38, floatY: 20, rotateDeg: 360, duration: 24, delay: 0.9 },
];

const rings = [
	{ scale: 0.22, delay: 0 },
	{ scale: 0.38, delay: 0.5 },
	{ scale: 0.55, delay: 1.0 },
	{ scale: 0.72, delay: 1.5 },
	{ scale: 0.90, delay: 2.0 },
	{ scale: 1.10, delay: 2.5 },
];

// ─── Floating shape with mouse repulsion ─────────────────────────────────────

interface FloatingShapeProps {
	el: FloatingEl;
	color: string;
	mouseX: ReturnType<typeof useMotionValue<number>>;
	mouseY: ReturnType<typeof useMotionValue<number>>;
	containerRef: React.RefObject<HTMLDivElement | null>;
}

function FloatingShape({ el, color, mouseX, mouseY, containerRef }: FloatingShapeProps) {
	const repelX = useMotionValue(0);
	const repelY = useMotionValue(0);
	const springRepelX = useSpring(repelX, { stiffness: 80, damping: 15 });
	const springRepelY = useSpring(repelY, { stiffness: 80, damping: 15 });

	const THRESHOLD = 160;
	const MAX_FORCE = 70;

	useAnimationFrame(() => {
		const container = containerRef.current;
		if (!container) return;
		const mx = mouseX.get();
		const my = mouseY.get();
		if (!isFinite(mx) || !isFinite(my)) {
			repelX.set(0);
			repelY.set(0);
			return;
		}

		const rect = container.getBoundingClientRect();
		const elCenterX = rect.left + (parseFloat(el.left) / 100) * rect.width + el.size / 2;
		const elCenterY = rect.top + (parseFloat(el.top) / 100) * rect.height + el.size / 2;

		const dx = elCenterX - mx;
		const dy = elCenterY - my;
		const dist = Math.sqrt(dx * dx + dy * dy);

		if (dist < THRESHOLD && dist > 0) {
			const force = (1 - dist / THRESHOLD) * MAX_FORCE;
			repelX.set((dx / dist) * force);
			repelY.set((dy / dist) * force);
		} else {
			repelX.set(0);
			repelY.set(0);
		}
	});

	return (
		<motion.div
			style={{
				position: "absolute",
				top: el.top,
				left: el.left,
				width: el.size,
				height: el.size,
				x: springRepelX,
				y: springRepelY,
			}}
			animate={{ rotate: [0, el.rotateDeg] }}
			transition={{
				rotate: { duration: el.duration, repeat: Infinity, ease: "linear", delay: el.delay },
			}}
			whileHover={{ scale: 1.3 }}
		>
			<motion.div
				style={{ width: "100%", height: "100%" }}
				animate={{ y: [0, -el.floatY, 0] }}
				transition={{ duration: el.duration * 0.6, repeat: Infinity, ease: "easeInOut", delay: el.delay }}
			>
				{el.shape === "flower" && <Flower color={color} />}
				{el.shape === "sparkle" && <Sparkle color={color} />}
				{el.shape === "limeslice" && <LimeSlice color={color} />}
				{el.shape === "ring" && <Ring color={color} />}
			</motion.div>
		</motion.div>
	);
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function AnimatedBackground({ color, bgColor }: { color: string; bgColor: string }) {
	const mouseX = useMotionValue(Infinity);
	const mouseY = useMotionValue(Infinity);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
		const onLeave = () => { mouseX.set(Infinity); mouseY.set(Infinity); };
		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseleave", onLeave);
		return () => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseleave", onLeave);
		};
	}, [mouseX, mouseY]);

	return (
		<div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute inset-0" style={{
				background: `radial-gradient(ellipse at 45% 45%, rgba(255,255,255,0.18) 0%, ${bgColor} 60%)`,
			}} />

			{rings.map((ring, i) => (
				<motion.div key={i} className="absolute rounded-full" style={{
					left: "50%", top: "50%",
					width: `${ring.scale * 100}vmin`,
					height: `${ring.scale * 100}vmin`,
					marginLeft: `${-(ring.scale * 50)}vmin`,
					marginTop: `${-(ring.scale * 50)}vmin`,
					border: `2px solid ${color}`,
					opacity: 0,
				}}
					animate={{ opacity: [0.15, 0.45, 0.15], scale: [0.97, 1.03, 0.97] }}
					transition={{ duration: 4, repeat: Infinity, delay: ring.delay, ease: "easeInOut" }}
				/>
			))}

			{floatingElements.map((el, i) => (
				<FloatingShape
					key={i}
					el={el}
					color={color}
					mouseX={mouseX}
					mouseY={mouseY}
					containerRef={containerRef}
				/>
			))}
		</div>
	);
}
