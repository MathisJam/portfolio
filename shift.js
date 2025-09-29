document.addEventListener("DOMContentLoaded", () => {
	// --- 1. Canvas pour sparks ---
	const sparksCanvas = document.createElement("canvas");
	sparksCanvas.width = window.innerWidth;
	sparksCanvas.height = window.innerHeight;
	sparksCanvas.style.position = "fixed";
	sparksCanvas.style.top = 0;
	sparksCanvas.style.left = 0;
	sparksCanvas.style.width = "100%";
	sparksCanvas.style.height = "100%";
	sparksCanvas.style.zIndex = "0"; // derrière tout le contenu
	sparksCanvas.style.pointerEvents = "none";
	document.body.appendChild(sparksCanvas);

	const ctx = sparksCanvas.getContext("2d");
	const sparks = [];
	let mouseX = window.innerWidth / 2;
	let mouseY = window.innerHeight / 2;

	const minLength = 5;
	const maxLength = 30;

	window.addEventListener("mousemove", e => {
		mouseX = e.clientX;
		mouseY = e.clientY;

		for (let i = 0; i < 3; i++) {
			sparks.push({
				x: mouseX,
				y: mouseY,
				length: minLength + Math.random() * (maxLength - minLength),
				angle: Math.random() * Math.PI * 2,
				width: 0.3 + Math.random() * 1,
				life: 0,
				maxLife: 10 + Math.random() * 35,
				chaos: (Math.random() - 0.5) * 5
			});
		}
	});

	function drawSpark(s) {
		ctx.strokeStyle = "rgba(0, 147, 155, 0.7)";
		ctx.lineWidth = s.width;
		ctx.beginPath();
		ctx.moveTo(s.x, s.y);

		const segments = 4;
		let px = s.x;
		let py = s.y;

		for (let i = 0; i < segments; i++) {
			const segmentLength = (s.length / segments) * (0.5 + Math.random());
			const ex = px + Math.cos(s.angle) * segmentLength + (Math.random() - 0.5) * s.chaos * 20;
			const ey = py + Math.sin(s.angle) * segmentLength + (Math.random() - 0.5) * s.chaos * 20;
			ctx.lineTo(ex, ey);
			px = ex;
			py = ey;

			s.angle += (Math.random() - 0.5) * 0.2;
		}

		ctx.stroke();
	}

	function drawAura(x, y) {
		const gradient = ctx.createRadialGradient(x, y, 0, x, y, 45);
		gradient.addColorStop(0, "rgba(0, 173, 181, 0.2)");
		gradient.addColorStop(1, "rgba(0, 173, 181, 0)");
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(x, y, 60, 0, Math.PI * 2);
		ctx.fill();
	}

	function animateSparks() {
		ctx.fillStyle = "#222831"; // même fond que le header
		ctx.fillRect(0, 0, sparksCanvas.width, sparksCanvas.height);

		drawAura(mouseX, mouseY);

		for (let i = sparks.length - 1; i >= 0; i--) {
			const s = sparks[i];
			drawSpark(s);
			s.life++;
			s.x += Math.cos(s.angle) * 2 + (Math.random() - 0.5) * s.chaos * 10;
			s.y += Math.sin(s.angle) * 2 + (Math.random() - 0.5) * s.chaos * 10;

			if (s.life > s.maxLife) sparks.splice(i, 1);
		}

		requestAnimationFrame(animateSparks);
	}

	animateSparks();

	window.addEventListener("resize", () => {
		sparksCanvas.width = window.innerWidth;
		sparksCanvas.height = window.innerHeight;
	});

	// --- 2. VANTA.TRUNK ---
	if (typeof VANTA !== "undefined") {
		const vanta = VANTA.TRUNK({
			el: "#main-header",
			mouseControls: true,
			touchControls: true,
			gyroControls: false,
			minHeight: 200.0,
			minWidth: 200.0,
			scale: 1.0,
			scaleMobile: 1.0,
			color: 0x00ADB5,
			backgroundAlpha: 0.0,
			backgroundColor: 0x222831,
			chaos: 5.0,
			spacing: 1.0,
			speed: 2.0
		});

		const headerCanvas = document.querySelector('#main-header canvas');
		if (headerCanvas) {
			headerCanvas.style.position = 'absolute';
			headerCanvas.style.zIndex = '10'; // derrière tout le contenu du header
		}

		document.addEventListener("mousemove", (e) => {
			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;

			const dx = Math.abs((e.clientX - centerX) / centerX);
			const dy = Math.abs((e.clientY - centerY) / centerY);
			const dist = Math.max(dx, dy);
			const intensity = 1 - dist;

			if (vanta) {
				vanta.setOptions({
					chaos: 5 + intensity * 50,
					speed: 1 + intensity * 20
				});
			}
		});
	}
});
