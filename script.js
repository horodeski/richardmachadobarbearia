const linkZap = document.querySelector(".btn-whatsapp-flutuante");
const links = document.querySelectorAll(".nav-link");
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-track img");
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("mobile-menu");
const nav = document.querySelector("nav");
const overlay = document.getElementById("overlay");

let index = 0;

linkZap.addEventListener("click", function () {
	const msg = "Olá, vi o site da barbearia e quero agendar!";
	this.href = `https://wa.me/5547999546761?text=${encodeURIComponent(msg)}`;
});

links.forEach(link => {
	link.addEventListener("click", function (e) {
		const targetId = this.getAttribute("href");

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

		closeMenu();
	});
});

function getSlidesPerView() {
	if (window.innerWidth <= 600) return 1;
	if (window.innerWidth <= 900) return 2;
	return 3;
}

function updateCarousel() {
	if (!slides.length) return;
	const slideWidth = slides[0].clientWidth + 20;
	track.style.transform = `translateX(-${index * slideWidth}px)`;
}

document.querySelector(".next").addEventListener("click", () => {
	const maxIndex = slides.length - getSlidesPerView();
	index++;
	if (index > maxIndex) index = 0;
	updateCarousel();
});

document.querySelector(".prev").addEventListener("click", () => {
	const maxIndex = slides.length - getSlidesPerView();
	index--;
	if (index < 0) index = maxIndex;
	updateCarousel();
});

setInterval(() => {
	const maxIndex = slides.length - getSlidesPerView();
	index++;
	if (index > maxIndex) index = 0;
	updateCarousel();
}, 4000);

window.addEventListener("resize", updateCarousel);


hamburger.addEventListener("click", () => {
	menu.classList.toggle("active");
	overlay.classList.toggle("active");
	document.body.classList.toggle("no-scroll");

	const icon = hamburger.querySelector("i");
	icon.classList.toggle("fa-bars");
	icon.classList.toggle("fa-xmark");
});

function closeMenu() {
	menu.classList.remove("active");
	overlay.classList.remove("active");
	document.body.classList.remove("no-scroll");

	const icon = hamburger.querySelector("i");
	icon.classList.remove("fa-xmark");
	icon.classList.add("fa-bars");
}

document.addEventListener("click", function (event) {
	const isClickInsideMenu = menu.contains(event.target);
	const isClickOnHamburger = hamburger.contains(event.target);

	if (!isClickInsideMenu && !isClickOnHamburger) {
		closeMenu();
	}
});

overlay.addEventListener("click", closeMenu);