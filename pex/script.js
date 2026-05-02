const linkZap = document.querySelector(".btn-whatsapp-flutuante");
const offset = 130;
const links = document.querySelectorAll(".nav-link");
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-track img");

let index = 0;

linkZap.addEventListener("click", function (event) {
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
	});
});

function getSlidesPerView() {
	if (window.innerWidth <= 600) return 1;
	if (window.innerWidth <= 900) return 2;
	return 3;
}

function updateCarousel() {
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