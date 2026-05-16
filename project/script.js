// Tab switching logic
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // remove active from all
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // add active to clicked
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
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

