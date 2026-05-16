// Tab switching with smooth transition
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // remove active from all
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => {
      c.classList.remove('active');
      c.style.display = "none"; // hide instantly
    });

    // add active to clicked
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.tab);
    target.style.display = "block"; // show before animation
    setTimeout(() => target.classList.add('active'), 10); // trigger animation
  });
});
// Lightbox functionality
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <span class="close">&times;</span>
  <img id="lightbox-img" src="" alt="Expanded Image">
`;
document.body.appendChild(lightbox);

const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = lightbox.querySelector('.close');

// Open lightbox when image clicked
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Close when clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
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

document.querySelectorAll('.toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    const gallery = toggle.nextElementSibling;
    if (gallery.style.display === "block") {
      gallery.style.display = "none";
    } else {
      gallery.style.display = "block";
    }
  });
});
