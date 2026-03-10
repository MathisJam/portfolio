"use client";

import dynamic from "next/dynamic";
import { projects } from "@/lib/data";

const FlowingMenu = dynamic(() => import("@/components/ui/FlowingMenu"), { ssr: false });

const GREEN = "#5cf964";

export default function Projects() {
	const menuItems = projects.map((p) => ({
		link: p.link,
		text: p.title,
		image: p.images[0] || "",
		description: p.description.replace(/\n/g, " "),
	}));

	return (
		<section
			id="projects"
			className="relative h-screen w-full overflow-hidden"
			style={{ scrollSnapAlign: "start", backgroundColor: "#000" }}
		>
			{/* Subtle halo */}
			<div className="absolute inset-0 pointer-events-none" style={{
				background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(92,249,100,0.12) 0%, transparent 70%)",
			}} />

			<div className="h-full w-full flex flex-col">
				{/* Section label — centered, bigger */}
				<div className="px-8 md:px-16 pt-8 pb-6 flex justify-center">
					<p
						className="text-sm md:text-base tracking-[0.3em] uppercase font-medium"
						style={{ color: GREEN }}
					>
						Projets
					</p>
				</div>

				{/* FlowingMenu fills remaining space */}
				<div className="flex-1 relative">
					<FlowingMenu
						items={menuItems}
						speed={15}
						textColor="#ffffff"
						bgColor="#000000"
						marqueeBgColor={GREEN}
						marqueeTextColor="#000000"
						borderColor="rgba(255,255,255,0.1)"
					/>
				</div>
			</div>
		</section>
	);
}
