import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import PageIntro from "@/components/ui/PageIntro";
import CursorFollower from "@/components/ui/CursorFollower";

export default function Home() {
	return (
		<>
			<CursorFollower />
			<PageIntro />
			<main
				className="h-screen overflow-y-scroll"
				style={{
					scrollSnapType: "y mandatory",
					overscrollBehaviorY: "contain",
				}}
			>
				<Hero />
				<About />
				<Skills />
				<Projects />
				<Contact />
			</main>
		</>
	);
}
