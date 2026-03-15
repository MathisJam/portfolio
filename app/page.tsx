import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import PageIntro from "@/components/ui/PageIntro";
import Header from "@/components/ui/Header";

export default function Home() {
	return (
		<>
			<PageIntro />
			<Header />
			<main
				className="h-screen overflow-y-scroll snap-y snap-proximity md:snap-mandatory"
				style={{
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
