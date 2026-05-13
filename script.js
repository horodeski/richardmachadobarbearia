// Carrega componentes HTML usando fetch
async function loadComponent(path, containerId) {
	try {
		const response = await fetch(path);

		if (!response.ok) {
			throw new Error("Erro ao carregar componente");
		}

		const html = await response.text();

		document.getElementById(containerId).innerHTML = html;
	} catch (error) {
		console.error(error);
	}
}

async function init() {
	await loadComponent("./components/nav.html", "navbar-container");
	await loadComponent("./components/footer.html", "footer-container");

	// Botão WhatsApp
	const linkZap = document.querySelector(".btn-whatsapp-flutuante");

	// Links de navegação
	const links = document.querySelectorAll(".nav-link");

	// Carousel
	const track = document.querySelector(".carousel-track");
	const slides = document.querySelectorAll(".carousel-track img");

	// Menu mobile
	const hamburger = document.getElementById("hamburger");
	const menu = document.getElementById("mobile-menu");
	const overlay = document.getElementById("overlay");

	// Navbar
	const nav = document.querySelector("nav");

	// Botões do carousel
	const nextButton = document.querySelector(".next");
	const prevButton = document.querySelector(".prev");

	// Índice atual do carousel
	let index = 0;

	// Adiciona mensagem automática ao clicar
	linkZap.addEventListener("click", function () {
		const msg = "Olá, vi o site da barbearia e quero agendar!";

		this.href = `https://wa.me/5547999546761?text=${encodeURIComponent(msg)}`;
	});

	// Navegação suave entre seções
	links.forEach((link) => {
		link.addEventListener("click", function (e) {
			const targetId = this.getAttribute("href");

			// Ignora links inválidos
			if (!targetId || targetId === "#") return;

			e.preventDefault();

			const targetSection = document.querySelector(targetId);

			if (targetSection) {
				const navHeight = nav.offsetHeight;

				const y = targetSection.getBoundingClientRect().top + window.scrollY;

				window.scrollTo({
					top: y - navHeight - 60,
					behavior: "smooth"
				});
			}

			// Fecha menu mobile
			closeMenu();
		});
	});

	// Define quantidade de slides visíveis
	function getSlidesPerView() {
		if (window.innerWidth <= 600) return 1;
		if (window.innerWidth <= 900) return 2;

		return 3;
	}

	// Atualiza posição do carousel
	function updateCarousel() {
		if (!slides.length) return;

		const slideWidth = slides[0].clientWidth + 20;

		track.style.transform = `translateX(-${index * slideWidth}px)`;
	}

	// Próximo slide
	function nextSlide() {
		const maxIndex = slides.length - getSlidesPerView();

		index++;

		if (index > maxIndex) {
			index = 0;
		}

		updateCarousel();
	}

	// Slide anterior
	function prevSlide() {
		const maxIndex = slides.length - getSlidesPerView();

		index--;

		if (index < 0) {
			index = maxIndex;
		}

		updateCarousel();
	}

	// Eventos dos botões
	nextButton.addEventListener("click", nextSlide);
	prevButton.addEventListener("click", prevSlide);

	// Troca automática
	setInterval(nextSlide, 4000);

	// Atualiza ao redimensionar
	window.addEventListener("resize", updateCarousel);

	// Abre/fecha menu
	hamburger.addEventListener("click", () => {
		menu.classList.toggle("active");
		overlay.classList.toggle("active");
		document.body.classList.toggle("no-scroll");

		// Alterna ícone
		const icon = hamburger.querySelector("i");

		icon.classList.toggle("fa-bars");
		icon.classList.toggle("fa-xmark");
	});

	// Fecha menu
	function closeMenu() {
		menu.classList.remove("active");
		overlay.classList.remove("active");
		document.body.classList.remove("no-scroll");

		const icon = hamburger.querySelector("i");

		icon.classList.remove("fa-xmark");
		icon.classList.add("fa-bars");
	}

	// Fecha ao clicar no overlay
	overlay.addEventListener("click", closeMenu);

	// Fecha ao clicar fora
	document.addEventListener("click", function (event) {
		const isClickInsideMenu = menu.contains(event.target);
		const isClickOnHamburger = hamburger.contains(event.target);

		if (!isClickInsideMenu && !isClickOnHamburger) {
			closeMenu();
		}
	});
}

init();