"use client";

const LimeSlice = ({ color }: { color: string }) => {
	const cx = 50, cy = 50, r = 38;
	const lines = Array.from({ length: 8 }, (_, i) => {
		const angle = (i * Math.PI * 2) / 8;
		return { x2: cx + r * Math.cos(angle), y2: cy + r * Math.sin(angle) };
	});
	return (
		<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
			<circle cx={cx} cy={cy} r="47" fill={color} opacity="0.2" />
			<circle cx={cx} cy={cy} r={r} fill={color} opacity="0.08" />
			<circle cx={cx} cy={cy} r="47" stroke={color} strokeWidth="1.5" opacity="0.35" />
			<circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth="1" opacity="0.3" />
			{lines.map((l, i) => (
				<line key={i} x1={cx} y1={cy} x2={l.x2} y2={l.y2}
					stroke={color} strokeWidth="1" opacity="0.25" />
			))}
			<circle cx={cx} cy={cy} r="4" fill={color} opacity="0.5" />
		</svg>
	);
};

const slices = [
	{ top: "6%", left: "3%", size: 44, rotate: 15 },
	{ top: "8%", left: "82%", size: 36, rotate: 230 },
	{ top: "78%", left: "5%", size: 40, rotate: 120 },
	{ top: "82%", left: "88%", size: 48, rotate: 310 },
	{ top: "42%", left: "92%", size: 28, rotate: 75 },
];

export default function AnimatedBackground({ color, bgColor }: { color: string; bgColor: string }) {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute inset-0" style={{
				background: `radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.06) 0%, ${bgColor} 70%)`,
			}} />

			<div className="hidden md:contents">
				{slices.map((s, i) => (
					<div
						key={i}
						style={{
							position: "absolute",
							top: s.top,
							left: s.left,
							width: s.size,
							height: s.size,
							transform: `rotate(${s.rotate}deg)`,
							opacity: 0.25,
						}}
					>
						<LimeSlice color={color} />
					</div>
				))}
			</div>
		</div>
	);
}
