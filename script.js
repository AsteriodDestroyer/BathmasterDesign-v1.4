  // Firebase config (corrected storageBucket)
   const firebaseConfig = {
    apiKey: "AIzaSyChQ88tI-L_6cJFQmg9DTckVqp5BChZBRw",
    authDomain: "adminportal-fa94f.firebaseapp.com",
    projectId: "adminportal-fa94f",
    storageBucket: "adminportal-fa94f.appspot.com", // ✅ corrected
    messagingSenderId: "684666197564",
    appId: "1:684666197564:web:6134362c00158a1169d539",
    measurementId: "G-83MQMWC3L0"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


/* ===============================
   CONSULTATION BUTTON
   =============================== */
document.querySelector('.primary').addEventListener('click', () => {
  alert('We’ll contact you soon to schedule your consultation.');
});

/* ===============================
   HEADER SCROLL BEHAVIOR
   =============================== */
let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector('.navbar');

window.addEventListener("scroll", () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "15px";
    navbar.style.opacity = "1";
  } else {
    navbar.style.top = "-100px";
    navbar.style.opacity = "0";
  }
  prevScrollPos = currentScrollPos;
});

/* ===============================
   BUTTON INTERACTIONS
   =============================== */
document.querySelectorAll('.learn-btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('More details coming soon!');
  });
});

document.querySelector('.view-btn').addEventListener('click', () => {
  window.location.href = 'portfolio.html';
});

/* ===============================
   FADE-IN ANIMATIONS
   =============================== */
const cards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
cards.forEach(card => cardObserver.observe(card));

const steps = document.querySelectorAll('.step');
const stepObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
steps.forEach(step => stepObserver.observe(step));

/* ===============================
   ABOUT SECTION SERVICE CARDS ANIMATION
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), index * 200);
      }
    });
  }, { threshold: 0.2 });
  serviceCards.forEach(card => observer.observe(card));
});

/* ===============================
   CONSULTATION FORM HANDLER (Firestore)
   =============================== */
const consultationForm = document.getElementById("consultationForm");

async function saveConsultation(e) {
  e.preventDefault();
  const name = document.getElementById("cName")?.value.trim() || "";
  const email = document.getElementById("cEmail")?.value.trim() || "";
  const phone = document.getElementById("cPhone")?.value.trim() || "";
  const message = document.getElementById("cMessage")?.value.trim() || "";
  const dateRequested = new Date().toLocaleString();

  const request = { name, email, phone, message, dateRequested };

  try {
    await db.collection("consultations").add(request);
    alert("Thank you! Your consultation request has been submitted!");
    e.target.reset();
  } catch (error) {
    console.error("Error saving consultation: ", error);
    alert("There was an error submitting your request.");
  }
}

if (consultationForm) {
  consultationForm.addEventListener("submit", saveConsultation);
}

/* ===============================
   REVIEWS HANDLER (Firestore)
   =============================== */
let reviewsData = [];
let currentIndex = 0;
const pageSize = 3;

const reviewList = document.getElementById("reviewList");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

async function loadReviews() {
  reviewList.innerHTML = "";
  try {
    const snapshot = await db.collection("reviews").orderBy("datePosted", "desc").get();
    reviewsData = [];
    snapshot.forEach(doc => reviewsData.push(doc.data()));
    if (reviewsData.length === 0) {
      reviewList.innerHTML = "<p>No reviews yet. Be the first to share your experience!</p>";
      return;
    }
    renderReviews();
  } catch (error) {
    console.error("Error loading reviews: ", error);
    reviewList.innerHTML = "<p>Error loading reviews.</p>";
  }
}

function renderReviews() {
  reviewList.innerHTML = "";
  const slice = reviewsData.slice(currentIndex, currentIndex + pageSize);
  slice.forEach(r => {
    const profileImg = r.photo && r.photo.trim() !== ""
      ? r.photo
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review-card";
    reviewDiv.innerHTML = `
      <div class="stars">${r.rating}</div>
      <p class="quote">"${r.text}"</p>
      <div class="client">
        <img src="${profileImg}" alt="Profile" class="client-photo"
             style="width:50px;height:50px;border-radius:50%;object-fit:cover;">
        <div class="client-info">
          <strong>${r.name}</strong><br>
          <span>${r.role}</span>
        </div>
      </div>
    `;
    reviewList.appendChild(reviewDiv);
  });
}

document.getElementById("clientReviewForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const name = document.getElementById("rName").value.trim();
  const role = document.getElementById("rRole").value;
  const rating = document.getElementById("rRating").value;
  const text = document.getElementById("rText").value.trim();

  const review = { name, role, rating, text, datePosted: new Date().toLocaleString() };

  try {
    await db.collection("reviews").add(review);
    alert("Thank you! Your review has been posted.");
    this.reset();
    currentIndex = 0;
    loadReviews();
  } catch (error) {
    console.error("Error adding review: ", error);
    alert("Error submitting review.");
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex + pageSize < reviewsData.length) {
    currentIndex += pageSize;
  } else {
    currentIndex = 0;
  }
  renderReviews();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex - pageSize >= 0) {
    currentIndex -= pageSize;
  } else {
    currentIndex = Math.max(0, reviewsData.length - pageSize);
  }
  renderReviews();
});

document.addEventListener("DOMContentLoaded", loadReviews);

/* ===============================
   TOGGLE REVIEW FORM
   =============================== */
const toggleBtn = document.getElementById('toggleFormBtn');
const reviewForm = document.querySelector('.review-form');
toggleBtn.addEventListener('click', () => {
  reviewForm.classList.toggle('active');
  toggleBtn.textContent = reviewForm.classList.contains('active') ? "Hide Review Form" : "Share Your Experience";
});

/* ===============================
   FOOTER LINKS BEHAVIOR
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("footerServices").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("footerProcess").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("process").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("footerPortfolio").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = 'portfolio.html';
  });
});

/* ===============================
   MOBILE NAVBAR TOGGLE
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".navbar nav ul");
  if (menuToggle) {
    menuToggle.onclick = () => {
      navMenu.classList.toggle("show");
      menuToggle.classList.toggle("active");
    };
  }
});

/* ===============================
   CHATBOT LOGIC
   =============================== */
const toggle = document.querySelector('.chat-toggle');
const windowEl = document.querySelector('.chat-window');
const closeBtn = document.querySelector('.chat-close');
const chatBody = document.getElementById('chatBody');
const input = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = type === 'bot' ? 'bot-msg' : 'user-msg';
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function resetChat() {
  chatBody.innerHTML = '';
  addMessage('Hello! 👋 Welcome to Bath Master Design. Are you looking for inspiration or ready to start a renovation project?', 'bot');
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';

  setTimeout(() => {
    let reply = '';
    if (/inspiration/i.test(text)) {
      reply = 'Great choice! You can browse our portfolio to see completed projects.';
    } else if (/renovation/i.test(text)) {
      reply = 'Perfect! Would you like to schedule a free consultation?';
    } else if (/full remodel/i.test(text)) {
      reply = 'We specialize in complete bathroom transformations.';
    } else if (/shower/i.test(text)) {
      reply = 'We can design and build custom showers tailored to your space.';
    } else if (/accessible/i.test(text)) {
      reply = 'We create safe, stylish accessible bathrooms.';
    } else if (/yes/i.test(text)) {
      reply = 'Please provide your email or phone number, and we’ll reach out.';
    } else if (/no/i.test(text)) {
      reply = 'No problem! You can explore our services anytime.';
    } else {
      reply = 'Thanks for sharing! Feel free to ask me about services, portfolio, or consultations.';
    }
    addMessage(reply, 'bot');
  }, 600);
}

toggle.addEventListener('click', () => {
  windowEl.style.display = 'flex';
  toggle.style.display = 'none';
  resetChat();
});

closeBtn.addEventListener('click', () => {
  windowEl.style.display = 'none';
  toggle.style.display = 'flex';
  resetChat();
});

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
