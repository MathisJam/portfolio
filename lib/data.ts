export const languages = [
	{ name: "C" },
	{ name: "C++" },
	{ name: "Python" },
	{ name: "TypeScript" },
	{ name: "HTML/CSS" },
	{ name: "Tailwind" },
	{ name: "SQL" },
];

export const tools = [
	{ name: "GitHub" },
	{ name: "Docker" },
	{ name: "Kubernetes" },
	{ name: "Vagrant" },
	{ name: "VSCode" },
	{ name: "Claude Code" },
	{ name: "Prisma" },
];

export const projects = [
	{
		title: "Transcendence",
		description: "Plateforme web de Pong multijoueur.\nJ'ai principalement développé l'ensemble du système d'authentification : OAuth2 via l'API 42, génération et validation de JWT, et 2FA par Mail, SMS et TOTP (Google Authenticator).\nJ'ai également géré la cybersécurité : protection contre les injections SQL et XSS grâce à l'ORM Prisma et l'input sanitization/validation, et hash des mots de passe avec bcrypt.",
		link: "https://github.com/MathisJam/42-Common-Core/tree/main/Transcendence",
		tags: ["TypeScript", "JWT", "OAuth2", "2FA", "WebSocket", "SQLite"],
		images: [
			"/images/Transcendence.png",
			"/images/Pong.png",
			"/images/2FA.png",
		],
	},
	{
		title: "So_Long",
		description: "Jeu vidéo 2D développé en C dans le cadre du cursus 42.\nJ'ai utilisé la MiniLibX, une API de programmation X-Window, pour gérer le rendu graphique, les sprites et les événements clavier.\nCe projet m'a permis de renforcer mes connaissances en C : gestion mémoire, parsing de maps et architecture d'une boucle de jeu.",
		link: "https://github.com/MathisJam/42-Common-Core/tree/main/so_long",
		tags: ["C", "MiniLibX", "X-Window", "2D"],
		images: [
			"/images/So_Long.png",
		],
	},
];

export const social = {
	github: "https://github.com/MathisJam",
	linkedin: "https://www.linkedin.com/in/mathis-jameau-0a55b3380/",
	email: "mathis.jameau3@gmail.com",
};
