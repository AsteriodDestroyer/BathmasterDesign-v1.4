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

//=================
// Terms of Service Popup Logic
//=================
window.addEventListener('load', () => {
  const tosPopup = document.getElementById('tos-popup');
  const tosButtonsMain = document.getElementById('tos-buttons-main');
  const tosStamp = document.getElementById('tos-stamp');
  const tosAcceptBtn = document.getElementById('tos-accept-btn');
  const tosDeclineBtn = document.getElementById('tos-decline-btn');
  const tosLink = document.getElementById('tos-link');
  const tosContent = document.querySelector('#tos-popup .tos-content');

  // First visit: show Accept/Decline
  if (!localStorage.getItem('tosAccepted')) {
    tosPopup.classList.add('active');
    tosButtonsMain.classList.add('show');
    tosStamp.classList.remove('show');
  }

  // Accept button
  tosAcceptBtn.addEventListener('click', () => {
    localStorage.setItem('tosAccepted', 'true');
    tosPopup.classList.remove('active');
  });

  // Decline button
  tosDeclineBtn.addEventListener('click', () => {
    localStorage.removeItem('tosAccepted');
    alert("You must accept the Terms of Service to use this site. Please retry.");
    window.location.reload();
  });

  // Footer link: show popup with stamp
  if (tosLink) {
    tosLink.addEventListener('click', (e) => {
      e.preventDefault();
      tosPopup.classList.add('active');
      tosButtonsMain.classList.remove('show'); // hide Accept/Decline
      tosStamp.classList.add('show');          // show Acknowledged ✔
    });
  }

  // Close popup when clicking outside (review mode only)
  tosPopup.addEventListener('click', (e) => {
    const firstVisit = !localStorage.getItem('tosAccepted');
    if (!firstVisit && !tosContent.contains(e.target)) {
      tosPopup.classList.remove('active');
    }
  });
});



//=================
// Privacy and Policy Popup Logic (similar to TOS)
//=================
window.addEventListener('load', () => {
  const privacyPopup = document.getElementById('privacy-popup');
  const privacyButtonsMain = document.getElementById('privacy-buttons-main');
  const privacyStamp = document.getElementById('privacy-stamp');
  const privacyAcceptBtn = document.getElementById('privacy-accept-btn');
  const privacyDeclineBtn = document.getElementById('privacy-decline-btn');
  const privacyLink = document.getElementById('privacy-link');
  const privacyContent = document.querySelector('#privacy-popup .privacy-content');

  // First visit: show Accept/Decline
  if (!localStorage.getItem('privacyAccepted')) {
    privacyPopup.classList.add('active');
    privacyButtonsMain.classList.add('show');
    privacyStamp.classList.remove('show');
  }

  // Accept button
  privacyAcceptBtn.addEventListener('click', () => {
    localStorage.setItem('privacyAccepted', 'true');
    privacyPopup.classList.remove('active');
  });

  // Decline button
  privacyDeclineBtn.addEventListener('click', () => {
    localStorage.removeItem('privacyAccepted');
    alert("You must accept the Privacy Policy to use this site. Please retry.");
    window.location.reload();
  });

  // Footer link: show popup with stamp
  if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      privacyPopup.classList.add('active');
      privacyButtonsMain.classList.remove('show'); // hide Accept/Decline
      privacyStamp.classList.add('show');          // show Acknowledged ✔
    });
  }

  // Close popup when clicking outside (review mode only)
  privacyPopup.addEventListener('click', (e) => {
    const firstVisit = !localStorage.getItem('privacyAccepted');
    if (!firstVisit && !privacyContent.contains(e.target)) {
      privacyPopup.classList.remove('active');
    }
  });
});
