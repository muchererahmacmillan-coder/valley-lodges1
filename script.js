// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ========== AMENITIES BUTTON HOVER ==========
const amenityButtons = document.querySelectorAll(".amenity-btn");
amenityButtons.forEach(btn => {
  btn.addEventListener("mouseover", () => {
    btn.classList.add("glow");
  });
  btn.addEventListener("mouseout", () => {
    btn.classList.remove("glow");
  });
});

// ========== BOOKING MODAL FUNCTIONALITY ==========
const roomData = {
  deluxe: {
    name: "Deluxe Room",
    desc: "Spacious room with a beautiful pool view and modern amenities.",
    price: 120
  },
  executive: {
    name: "Executive Suite",
    desc: "Luxurious suite with king bed, balcony, and signature services.",
    price: 180
  },
  family: {
    name: "Family Suite",
    desc: "Large suite perfect for families, with two beds and extra space.",
    price: 220
  }
};

// Handle Book Now button clicks
document.querySelectorAll(".book-btn").forEach(button => {
  button.addEventListener("click", (e) => {
    const roomKey = e.target.closest(".room-card")?.getAttribute("data-room") || "deluxe";
    const room = roomData[roomKey];

    // Fill modal with room info
    document.getElementById("bookingRoomTitle").innerText = `Book — ${room.name}`;
    document.getElementById("bookingRoomDesc").innerText = room.desc;
    document.getElementById("bookingPrice").innerText = `$${room.price} per night`;

    // Show modal
    document.getElementById("bookingModal").style.display = "flex";
  });
});

// Close booking modal
document.getElementById("bookingClose").addEventListener("click", () => {
  document.getElementById("bookingModal").style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("bookingModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// ========== BOOKING FORM SUBMISSION ==========
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = document.getElementById("guestName").value.trim();
    const email = document.getElementById("guestEmail").value.trim();
    const room_type = document.getElementById("bookingRoomTitle").innerText.replace("Book — ", "");
    const check_in = document.getElementById("checkIn").value;
    const check_out = document.getElementById("checkOut").value;

    const bookingStatus = document.getElementById("bookingStatus");
    bookingStatus.style.display = "block";
    bookingStatus.textContent = "Sending booking...";

    try {
      const res = await fetch("/.netlify/functions/createBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, email, room_type, check_in, check_out })
      });
      const data = await res.json();

      if (res.ok) {
        bookingStatus.textContent = "✅ " + data.message;
        bookingForm.reset();
      } else {
        bookingStatus.textContent = "⚠️ " + (data.error || "Booking failed");
      }
    } catch (error) {
      bookingStatus.textContent = "❌ Network error — please try again later.";
    }
  });
}
