// ===============================
// Collapsible Categories (only one open at a time)
// ===============================
document.querySelectorAll('.category h2.toggle').forEach(header => {
  header.addEventListener('click', () => {
    const gallery = header.nextElementSibling;

    // Close all other galleries
    document.querySelectorAll('.gallery').forEach(g => {
      if (g !== gallery) {
        g.classList.remove('expand');
      }
    });

    // Toggle the clicked one
    gallery.classList.toggle('expand');
  });
});

// ===============================
// Lightbox Functionality
// ===============================
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');

galleryImages.forEach(img => {
  img.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent collapsing when clicking image
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});
