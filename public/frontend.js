// ✅ Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // ✅ Navbar animation on load
  gsap.from("nav", {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // ✅ Hero Section animations
  gsap.from("section h1", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out"
  });

  gsap.from("section p", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power2.out"
  });

  gsap.from("section a", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay: 0.9,
    ease: "back.out(1.7)"
  });

  // ✅ Services cards (fade + slide on scroll)
  gsap.utils.toArray(".flex > div").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      },
      y: 80,
      opacity: 0,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out"
    });
  });

  // ✅ Wall Putty Section (image + text slide-in)
  gsap.from(".grid img", {
    scrollTrigger: {
      trigger: ".grid img",
      start: "top 85%"
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  });

  gsap.from(".grid div.text-gray-700", {
    scrollTrigger: {
      trigger: ".grid div.text-gray-700",
      start: "top 85%"
    },
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  });

  // ✅ Gallery images (smooth zoom on scroll)
  gsap.utils.toArray("section img.rounded-xl").forEach((img, i) => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        start: "top 90%"
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      delay: i * 0.15,
      ease: "power2.out"
    });
  });

  // ✅ Footer fade-in
  gsap.from("footer", {
    scrollTrigger: {
      trigger: "footer",
      start: "top 95%"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });