/**
 * Lightbox para galería: zoom con rueda, arrastrar para mover
 */
(function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxContent = document.querySelector(".lightbox-content");
  const lightboxClose = document.querySelector(".lightbox-close");

  if (!lightbox || !lightboxImg || !lightboxContent) return;

  const clickableSelectors = ".gallery-image--clickable img, .gallery-img-clickable";
  const galleryImages = document.querySelectorAll(clickableSelectors);

  let scale = 1;
  let posX = 0;
  let posY = 0;
  let isDragging = false;
  let startX, startY, startPosX, startPosY;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Imagen ampliada";
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";

    scale = 1;
    posX = 0;
    posY = 0;
    applyTransform();
  }

  function closeLightbox() {
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function applyTransform() {
    lightboxImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  }

  galleryImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      e.preventDefault();
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt") || "";
      if (src) openLightbox(src, alt);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });

  lightboxContent.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    scale = Math.min(Math.max(0.5, scale + delta), 5);
    applyTransform();
  }, { passive: false });

  function startDrag(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startPosX = posX;
    startPosY = posY;
  }

  lightboxContent.addEventListener("mousedown", (e) => {
    e.preventDefault();
    startDrag(e);
  });

  lightboxImg.addEventListener("mousedown", (e) => {
    e.preventDefault();
    startDrag(e);
  });

  lightboxImg.style.pointerEvents = "auto";
  lightboxImg.style.cursor = "grab";

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      posX = startPosX + (e.clientX - startX);
      posY = startPosY + (e.clientY - startY);
      applyTransform();
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  lightboxImg.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  let lastTouchDistance = 0;
  let lastTouchCenter = { x: 0, y: 0 };

  lightboxContent.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      lastTouchDistance = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      lastTouchCenter = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2
      };
    } else if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startPosX = posX;
      startPosY = posY;
    }
  }, { passive: true });

  lightboxContent.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      const delta = (distance - lastTouchDistance) * 0.01;
      scale = Math.min(Math.max(0.5, scale + delta), 5);
      lastTouchDistance = distance;
      applyTransform();
    } else if (e.touches.length === 1 && isDragging) {
      posX = startPosX + (e.touches[0].clientX - startX);
      posY = startPosY + (e.touches[0].clientY - startY);
      applyTransform();
    }
  }, { passive: false });

  lightboxContent.addEventListener("touchend", () => {
    isDragging = false;
  });
})();
