console.log("Script loaded successfully!");
document.addEventListener("DOMContentLoaded", () => {
  // ========== MOBILE NAV ==========
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // ========== NAVBAR SCROLL HIDE/SHOW ==========
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      navbar?.classList.add("nav-hidden");
    } else {
      navbar?.classList.remove("nav-hidden");
    }
    lastScrollY = window.scrollY;
  });

  // ========== ROOM MODAL FUNCTIONALITY ==========
  const roomCards = document.querySelectorAll(".room-card");
  const roomModal = document.getElementById("roomModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const roomCloseBtn = document.querySelector(".close-btn");

  roomCards.forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const img = card.querySelector("img")?.src;
      const title = card.querySelector("h3")?.textContent;
      const desc = card.querySelector("p")?.textContent;

      if (roomModal && modalImg && modalTitle && modalDesc) {
        modalImg.src = img;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        roomModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (roomCloseBtn && roomModal) {
    roomCloseBtn.addEventListener("click", () => {
      roomModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === roomModal) {
      roomModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // ========== BACK TO TOP BUTTON ==========
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ========== FADE-IN SCROLL EFFECT ==========
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
      }
    });
  });
  fadeEls.forEach(el => observer.observe(el));

  // ===== ROOM GALLERY MODAL =====
  const galleries = {
    deluxe: ["images/deluxe1.jpg", "images/deluxe2.jpg", "images/deluxe3.jpg"],
    executive: ["images/executive1.jpg", "images/executive2.jpg", "images/executive3.jpg"],
    family: ["images/family1.jpg", "images/family2.jpg", "images/family3.jpg"]
  };

  const galleryModal = document.getElementById("galleryModal");
  const galleryImg = document.getElementById("galleryImg");
  const galleryClose = document.querySelector("#galleryModal .close-btn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentRoom = null;
  let currentIndex = 0;

  document.querySelectorAll(".view-gallery").forEach(btn => {
    btn.addEventListener("click", () => {
      currentRoom = btn.dataset.room;
      currentIndex = 0;
      showGalleryImage();
      galleryModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  function showGalleryImage() {
    if (!currentRoom || !galleryImg) return;
    galleryImg.src = galleries[currentRoom][currentIndex];
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + galleries[currentRoom].length) % galleries[currentRoom].length;
      showGalleryImage();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % galleries[currentRoom].length;
      showGalleryImage();
    });
  }

  if (galleryClose && galleryModal) {
    galleryClose.addEventListener("click", () => {
      galleryModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // === TABBED MENU FUNCTIONALITY ===
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));

      button.classList.add("active");
      const targetTab = document.getElementById(button.dataset.tab);
      if (targetTab) targetTab.classList.add("active");
    });
  });

  // === SERVICE MODAL (Experiences Section) ===
  const serviceData = {
    tea: {
      img: "images/tea-plantation.jpg",
      title: "Tea Plantation Experience",
      desc: "Walk through the lush Honde Valley tea plantations, learn about tea harvesting, and enjoy fresh mountain air with scenic views that stretch for miles."
    },
    falls: {
      img: "images/mutarazi-falls.jpg",
      title: "Mutarazi Falls Adventure",
      desc: "Explore Zimbabwe’s second-highest waterfall — Mutarazi Falls — located just a short drive from Valley Lodges. Perfect for sightseeing, hiking, and breathtaking photography."
    },
    pool: {
      img: "images/swimming-pool.jpg",
      title: "Relax at Our Pool",
      desc: "Cool off and unwind in our large, crystal-clear swimming area. Whether you’re enjoying a morning dip or a sunset swim, it’s a peaceful escape surrounded by nature."
    }
  };

  const serviceCards = document.querySelectorAll(".service-card");
  const serviceModal = document.getElementById("serviceModal");
  const serviceModalImg = document.getElementById("serviceModalImg");
  const serviceModalTitle = document.getElementById("serviceModalTitle");
  const serviceModalDesc = document.getElementById("serviceModalDesc");
  const serviceClose = document.querySelector(".close-service");

  if (serviceCards && serviceModal) {
    serviceCards.forEach(card => {
      card.addEventListener("click", () => {
        const key = card.dataset.service;
        const data = serviceData[key];
        if (!data) return;

        serviceModalImg.src = data.img;
        serviceModalTitle.textContent = data.title;
        serviceModalDesc.textContent = data.desc;
        serviceModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });
  }

  if (serviceClose && serviceModal) {
    serviceClose.addEventListener("click", () => {
      serviceModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === serviceModal) {
      serviceModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // === WI-FI MODAL LOGIC ===
  const wifiModal = document.getElementById('wifiModal');
  const wifiButton = document.querySelector('.btn-wifi');
  const closeWifi = document.getElementById('closeWifi');
  const requestWifi = document.getElementById('requestWifi');

  if (wifiButton) {
    wifiButton.addEventListener('click', (e) => {
      e.preventDefault();
      wifiModal.style.display = 'flex';
    });
  }

  if (closeWifi) {
    closeWifi.addEventListener('click', () => {
      wifiModal.style.display = 'none';
    });
  }

  if (requestWifi) {
    requestWifi.addEventListener('click', () => {
      window.open(
        'https://wa.me/263775698154?text=Hello%20Valley%20Lodges,%20I%20need%20WiFi%20assistance.',
        '_blank'
      );
      wifiModal.style.display = 'none';
    });
  }
  // --- Booking modal logic (add to script.js) ---
(() => {
  // Grab elements
  const bookingModal = document.getElementById('bookingModal');
  const bookingClose = document.getElementById('bookingClose');
  const bookingForm = document.getElementById('bookingForm');
  const bookingRoomTitle = document.getElementById('bookingRoomTitle');
  const bookingRoomDesc = document.getElementById('bookingRoomDesc');
  const bookingPrice = document.getElementById('bookingPrice');
  const proofUploadGroup = document.getElementById('proofUploadGroup');
  const proofFile = document.getElementById('proofFile');
  const bookingStatus = document.getElementById('bookingStatus');

  // We'll fetch room data from Supabase via serverless function or embed prices in HTML.
  // For simplicity, embed a small mapping here (match your seeded prices).
  const roomData = {
    deluxe: {name:'Deluxe Room', price:120},
    executive: {name:'Executive Suite', price:180},
    family: {name:'Family Suite', price:220}
  };

  // Open booking modal when "Book Now" clicked
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.preventDefault();
      // find room slug: assume parent .room-card has data-room
      const card = btn.closest('.room-card');
      const slug = card?.dataset.room;
      if (!slug || !roomData[slug]) return alert('Room data not found.');

      bookingRoomTitle.textContent = `Book — ${roomData[slug].name}`;
      bookingRoomDesc.textContent = card.querySelector('p')?.textContent || '';
      bookingPrice.textContent = `$${roomData[slug].price}`;
      bookingModal.classList.add('show');
      bookingModal.style.display = 'flex';
      bookingModal.setAttribute('aria-hidden','false');

      // attach slug to form for submission
      bookingForm.dataset.roomSlug = slug;
    });
  });

  bookingClose.addEventListener('click', () => {
    bookingModal.classList.remove('show');
    bookingModal.style.display = 'none';
    bookingModal.setAttribute('aria-hidden','true');
    bookingForm.reset();
    proofUploadGroup.style.display = 'none';
    bookingStatus.style.display = 'none';
  });

  // Show / hide proof upload
  document.getElementById('paymentMethod').addEventListener('change', (e) => {
    if (e.target.value === 'bank') proofUploadGroup.style.display = 'block';
    else proofUploadGroup.style.display = 'none';
  });

  // Submit booking: send form to Netlify function /api/create-booking
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    bookingStatus.style.display = 'block';
    bookingStatus.textContent = 'Processing...';

    const form = new FormData();
    const roomSlug = bookingForm.dataset.roomSlug;
    const guestName = document.getElementById('guestName').value;
    const guestEmail = document.getElementById('guestEmail').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    // basic validation
    if (!guestName || !guestEmail || !checkIn || !checkOut) {
      bookingStatus.textContent = 'Please complete all fields.';
      return;
    }

    // compute nights and amount (simple)
    const nights = (new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24);
    if (nights <= 0) {
      bookingStatus.textContent = 'Check-out must be after check-in.';
      return;
    }
    const pricePerNight = roomData[roomSlug].price;
    const amount = (pricePerNight * nights).toFixed(2);

    form.append('room_slug', roomSlug);
    form.append('guest_name', guestName);
    form.append('guest_email', guestEmail);
    form.append('check_in', checkIn);
    form.append('check_out', checkOut);
    form.append('nights', nights);
    form.append('amount', amount);
    form.append('payment_method', paymentMethod);

    if (paymentMethod === 'bank' && proofFile.files.length) {
      form.append('proof', proofFile.files[0]);
    }

    try {
      const res = await fetch('/.netlify/functions/createBooking', {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Booking failed');

      // if Paynow returns a payment_url, redirect user there
      if (data.payment_url) {
        bookingStatus.textContent = 'Redirecting to payment...';
        // Optionally save booking id for later reference
        window.location.href = data.payment_url;
        return;
      }

      // bank transfer or proof: show message
      bookingStatus.textContent = data.message || 'Booking submitted. Awaiting approval.';
      bookingForm.reset();
      proofUploadGroup.style.display = 'none';
    } catch (err) {
      bookingStatus.textContent = 'Error: ' + (err.message || err);
    }
  });
})();
});
