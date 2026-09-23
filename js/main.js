/* ===================================================================
   SKULL HOTEL - OFFICIAL GAME DOWNLOAD PORTAL JAVASCRIPT
   Clean, Professional & Production-Ready
   Video Trailer, Banner Carousel, Exe Download Modal & Lightbox
   =================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initAssetFallbacks();
  initMediaShowcase();
  initDownloadFlow();
  initLightbox();
  initReviewVotes();
  initSmoothScroll();
});

// ===================================================================
// 0. BULLETPROOF ASSET FALLBACKS (Base64 for missing remote assets)
// ===================================================================
const FALLBACK_LOGO = "data:image/png;base64,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";
const FALLBACK_MAIN = "data:image/jpeg;base64,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";

function initAssetFallbacks() {
  // Global error listener for failed images
  window.addEventListener("error", (e) => {
    const target = e.target;
    if (target && target.tagName === "IMG") {
      const src = target.getAttribute("src") || "";
      if (src.includes("logo.png") && !target.dataset.fallbackApplied) {
        target.dataset.fallbackApplied = "1";
        target.src = FALLBACK_LOGO;
      } else if ((src.includes("main.jpg") || src.includes("capsule.png")) && !target.dataset.fallbackApplied) {
        target.dataset.fallbackApplied = "1";
        target.src = FALLBACK_MAIN;
      }
    }
  }, true);

  // Proactive check on DOM load
  document.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src") || "";
    if (src.includes("logo.png")) {
      const test = new Image();
      test.onerror = () => { img.src = FALLBACK_LOGO; };
      test.src = src;
    } else if (src.includes("main.jpg")) {
      const test = new Image();
      test.onerror = () => { img.src = FALLBACK_MAIN; };
      test.src = src;
    }
  });
}

// ===================================================================
// 1. MEDIA SHOWCASE (STEAM-STYLE VIDEO PLAYER + BANNER GALLERY)
// ===================================================================
function initMediaShowcase() {
  const container = document.getElementById("mainScreenContainer");
  const trailerVideo = document.getElementById("mainTrailerVideo");
  const screenshotImg = document.getElementById("mainScreenshotImg");
  const captionBar = document.getElementById("screenCaptionBar");
  const captionLabel = document.getElementById("captionLabelText");
  const zoomHintBtn = document.getElementById("zoomHintBtn");
  const thumbButtons = document.querySelectorAll(".thumb-button");
  const thumbnailsStrip = document.getElementById("thumbnailsStrip");

  // Top indicators
  const iconVideo = document.querySelector(".steam-icon-video");
  const iconPhoto = document.querySelector(".steam-icon-photo");
  const counterText = document.getElementById("steamMediaCounterText");

  // Viewport navigation arrows
  const viewportPrevBtn = document.getElementById("viewportPrevBtn");
  const viewportNextBtn = document.getElementById("viewportNextBtn");

  // Custom Video Controls Elements
  const videoControls = document.getElementById("steamVideoControls");
  const scrubberTrack = document.getElementById("steamScrubberTrack");
  const scrubberFill = document.getElementById("steamScrubberFill");
  const scrubberBuffer = document.getElementById("steamScrubberBuffer");
  const scrubberHover = document.getElementById("steamScrubberHover");
  const playPauseBtn = document.getElementById("steamPlayPauseBtn");
  const volumeBtn = document.getElementById("steamVolumeBtn");
  const timeText = document.getElementById("steamTimeText");
  const settingsBtn = document.getElementById("steamSettingsBtn");
  const theaterBtn = document.getElementById("steamTheaterBtn");
  const fullscreenBtn = document.getElementById("steamFullscreenBtn");

  // Steam Slider Controls for Thumbnails
  const sliderPrevBtn = document.getElementById("sliderPrevBtn");
  const sliderNextBtn = document.getElementById("sliderNextBtn");
  const sliderTrack = document.getElementById("steamSliderTrack");
  const sliderThumb = document.getElementById("steamSliderThumb");

  let currentIndex = 0;
  let isScrubbing = false;

  const mediaItems = Array.from(thumbButtons).map((btn) => ({
    type: btn.dataset.type, // "video" or "image"
    src: btn.dataset.src,
    title: btn.dataset.title || "Skull Hotel",
  }));

  const totalScreenshots = mediaItems.filter((item) => item.type === "image").length; // 8

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function updateVideoTime() {
    if (!trailerVideo) return;
    const cur = trailerVideo.currentTime || 0;
    const dur = trailerVideo.duration || 104; // default 1:44 if metadata pending
    if (timeText) {
      timeText.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
    }
    if (scrubberFill && dur > 0) {
      const pct = (cur / dur) * 100;
      scrubberFill.style.width = `${pct}%`;
    }
    if (scrubberBuffer && trailerVideo.buffered && trailerVideo.buffered.length > 0 && dur > 0) {
      const bufferedEnd = trailerVideo.buffered.end(trailerVideo.buffered.length - 1);
      const bufPct = Math.min(100, (bufferedEnd / dur) * 100);
      scrubberBuffer.style.width = `${bufPct}%`;
    }
  }

  function updatePlayPauseState() {
    if (!playPauseBtn || !trailerVideo) return;
    const isPaused = trailerVideo.paused;
    const pauseIcon = playPauseBtn.querySelector(".icon-pause");
    const playIcon = playPauseBtn.querySelector(".icon-play");
    if (pauseIcon && playIcon) {
      if (isPaused) {
        pauseIcon.style.display = "none";
        playIcon.style.display = "block";
      } else {
        pauseIcon.style.display = "block";
        playIcon.style.display = "none";
      }
    }
  }

  function updateVolumeState() {
    if (!volumeBtn || !trailerVideo) return;
    const isMuted = trailerVideo.muted || trailerVideo.volume === 0;
    const volOn = volumeBtn.querySelector(".icon-volume-on");
    const volOff = volumeBtn.querySelector(".icon-volume-off");
    if (volOn && volOff) {
      if (isMuted) {
        volOn.style.display = "none";
        volOff.style.display = "block";
      } else {
        volOn.style.display = "block";
        volOff.style.display = "none";
      }
    }
  }

  function setMedia(index, userAction = false) {
    if (index < 0) index = mediaItems.length - 1;
    if (index >= mediaItems.length) index = 0;
    currentIndex = index;

    // Update active thumb button
    thumbButtons.forEach((btn, idx) => {
      const isActive = idx === currentIndex;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    // Smooth scroll the active thumb into view
    const activeThumb = thumbButtons[currentIndex];
    if (activeThumb && thumbnailsStrip) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
        block: "nearest",
      });
    }

    const currentItem = mediaItems[currentIndex];

    // Handle Video vs Image display
    if (currentItem.type === "video") {
      if (screenshotImg) {
        screenshotImg.classList.remove("active");
        screenshotImg.style.display = "none";
      }
      if (trailerVideo) {
        trailerVideo.classList.add("active");
        trailerVideo.style.display = "block";
      }
      if (videoControls) {
        videoControls.style.display = "flex";
      }
      if (captionBar) {
        captionBar.style.display = "none";
      }

      // Top indicator state
      if (iconVideo) iconVideo.classList.add("active");
      if (iconPhoto) iconPhoto.classList.remove("active");
      if (counterText) counterText.textContent = `0/${totalScreenshots}`;

      if (userAction && trailerVideo && trailerVideo.paused) {
        trailerVideo.play().catch(() => {});
      }
    } else {
      // Switching to screenshot image
      if (trailerVideo) {
        trailerVideo.pause();
        trailerVideo.classList.remove("active");
        trailerVideo.style.display = "none";
      }
      if (videoControls) {
        videoControls.style.display = "none";
      }
      if (captionBar) {
        captionBar.style.display = "flex";
      }
      if (screenshotImg) {
        screenshotImg.style.opacity = "0.3";
        screenshotImg.style.display = "block";
        screenshotImg.classList.add("active");
        screenshotImg.src = currentItem.src;
        screenshotImg.alt = currentItem.title;
        setTimeout(() => {
          screenshotImg.style.opacity = "1";
        }, 60);
      }
      if (captionLabel) {
        captionLabel.textContent = currentItem.title;
      }
      if (zoomHintBtn) {
        zoomHintBtn.style.display = "inline-flex";
      }

      // Top indicator state: 1/8 to 8/8
      if (iconVideo) iconVideo.classList.remove("active");
      if (iconPhoto) iconPhoto.classList.add("active");
      if (counterText) counterText.textContent = `${currentIndex}/${totalScreenshots}`;
    }

    updateVideoTime();
    updatePlayPauseState();
    updateVolumeState();
  }

  // Viewport Side Chevron navigation buttons (< and >)
  if (viewportPrevBtn) {
    viewportPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      setMedia(currentIndex - 1, true);
    });
  }
  if (viewportNextBtn) {
    viewportNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      setMedia(currentIndex + 1, true);
    });
  }

  // Thumb click events
  thumbButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      setMedia(idx, true);
    });
  });

  // Video click toggles play/pause
  if (trailerVideo) {
    trailerVideo.addEventListener("click", () => {
      if (trailerVideo.paused) {
        trailerVideo.play();
      } else {
        trailerVideo.pause();
      }
    });

    trailerVideo.addEventListener("timeupdate", () => {
      if (!isScrubbing) {
        updateVideoTime();
      }
    });

    trailerVideo.addEventListener("progress", updateVideoTime);
    trailerVideo.addEventListener("play", updatePlayPauseState);
    trailerVideo.addEventListener("pause", updatePlayPauseState);
    trailerVideo.addEventListener("ended", updatePlayPauseState);
    trailerVideo.addEventListener("volumechange", updateVolumeState);
    trailerVideo.addEventListener("loadedmetadata", updateVideoTime);
  }

  // Play / Pause button
  if (playPauseBtn && trailerVideo) {
    playPauseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (trailerVideo.paused) {
        trailerVideo.play();
      } else {
        trailerVideo.pause();
      }
    });
  }

  // Volume button
  if (volumeBtn && trailerVideo) {
    volumeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      trailerVideo.muted = !trailerVideo.muted;
      updateVolumeState();
    });
  }

  // Scrubber scrubbing
  function scrubTo(e) {
    if (!scrubberTrack || !trailerVideo) return;
    const rect = scrubberTrack.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const dur = trailerVideo.duration || 104;
    trailerVideo.currentTime = ratio * dur;
    if (scrubberFill) {
      scrubberFill.style.width = `${ratio * 100}%`;
    }
    updateVideoTime();
  }

  if (scrubberTrack) {
    scrubberTrack.addEventListener("mousedown", (e) => {
      isScrubbing = true;
      scrubTo(e);
      const onMouseMove = (ev) => {
        if (isScrubbing) scrubTo(ev);
      };
      const onMouseUp = () => {
        isScrubbing = false;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });

    scrubberTrack.addEventListener("mousemove", (e) => {
      if (scrubberHover) {
        const rect = scrubberTrack.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        scrubberHover.style.left = `${x}px`;
        scrubberHover.style.display = "block";
      }
    });
    scrubberTrack.addEventListener("mouseleave", () => {
      if (scrubberHover) scrubberHover.style.display = "none";
    });
  }

  // Fullscreen button
  if (fullscreenBtn && container) {
    fullscreenBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });

    document.addEventListener("fullscreenchange", () => {
      const isFs = !!document.fullscreenElement;
      const expandIcon = fullscreenBtn.querySelector(".icon-expand");
      const compressIcon = fullscreenBtn.querySelector(".icon-compress");
      if (expandIcon && compressIcon) {
        expandIcon.style.display = isFs ? "none" : "block";
        compressIcon.style.display = isFs ? "block" : "none";
      }
    });
  }

  // Theater button: scroll into view nicely
  if (theaterBtn && container) {
    theaterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      container.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // Steam Slider for Thumbnails Carousel
  function updateSliderThumb() {
    if (!thumbnailsStrip || !sliderTrack || !sliderThumb) return;
    const maxScroll = thumbnailsStrip.scrollWidth - thumbnailsStrip.clientWidth;
    if (maxScroll <= 0) {
      sliderThumb.style.width = "100%";
      sliderThumb.style.left = "0px";
      return;
    }
    const visibleRatio = thumbnailsStrip.clientWidth / thumbnailsStrip.scrollWidth;
    const thumbWidth = Math.max(36, Math.floor(sliderTrack.clientWidth * visibleRatio));
    sliderThumb.style.width = `${thumbWidth}px`;

    const scrollRatio = thumbnailsStrip.scrollLeft / maxScroll;
    const maxThumbLeft = sliderTrack.clientWidth - thumbWidth;
    sliderThumb.style.left = `${Math.floor(scrollRatio * maxThumbLeft)}px`;
  }

  if (thumbnailsStrip) {
    thumbnailsStrip.addEventListener("scroll", updateSliderThumb);
    window.addEventListener("resize", updateSliderThumb);
    setTimeout(updateSliderThumb, 150);
  }

  if (sliderPrevBtn && thumbnailsStrip) {
    sliderPrevBtn.addEventListener("click", () => {
      thumbnailsStrip.scrollBy({ left: -140, behavior: "smooth" });
    });
  }
  if (sliderNextBtn && thumbnailsStrip) {
    sliderNextBtn.addEventListener("click", () => {
      thumbnailsStrip.scrollBy({ left: 140, behavior: "smooth" });
    });
  }

  // Draggable slider thumb
  if (sliderThumb && sliderTrack && thumbnailsStrip) {
    let isDraggingThumb = false;
    let startX = 0;
    let startScrollLeft = 0;

    sliderThumb.addEventListener("mousedown", (e) => {
      isDraggingThumb = true;
      startX = e.clientX;
      startScrollLeft = thumbnailsStrip.scrollLeft;
      e.preventDefault();

      const onMouseMove = (ev) => {
        if (!isDraggingThumb) return;
        const deltaX = ev.clientX - startX;
        const maxScroll = thumbnailsStrip.scrollWidth - thumbnailsStrip.clientWidth;
        const maxThumbTravel = sliderTrack.clientWidth - sliderThumb.clientWidth;
        if (maxThumbTravel > 0) {
          const scrollDelta = (deltaX / maxThumbTravel) * maxScroll;
          thumbnailsStrip.scrollLeft = startScrollLeft + scrollDelta;
        }
      };

      const onMouseUp = () => {
        isDraggingThumb = false;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });

    sliderTrack.addEventListener("click", (e) => {
      if (e.target === sliderThumb) return;
      const rect = sliderTrack.getBoundingClientRect();
      const clickRatio = (e.clientX - rect.left) / rect.width;
      const maxScroll = thumbnailsStrip.scrollWidth - thumbnailsStrip.clientWidth;
      thumbnailsStrip.scrollTo({ left: clickRatio * maxScroll, behavior: "smooth" });
    });
  }

  // Keyboard navigation (Arrow keys)
  document.addEventListener("keydown", (e) => {
    const isModalOpen =
      document.querySelector(".modal-backdrop.active") ||
      document.querySelector(".lightbox-backdrop.active");
    if (isModalOpen) return;

    if (e.key === "ArrowLeft") setMedia(currentIndex - 1, true);
    if (e.key === "ArrowRight") setMedia(currentIndex + 1, true);
    if (e.key === " " && document.activeElement === document.body) {
      const currentItem = mediaItems[currentIndex];
      if (currentItem && currentItem.type === "video" && trailerVideo) {
        e.preventDefault();
        if (trailerVideo.paused) trailerVideo.play();
        else trailerVideo.pause();
      }
    }
  });

  // Clicking screenshot image or zoom hint opens lightbox
  if (screenshotImg) {
    screenshotImg.addEventListener("click", () => {
      const currentItem = mediaItems[currentIndex];
      if (currentItem && currentItem.type === "image") {
        openLightbox(currentItem.src);
      }
    });
  }
  if (zoomHintBtn) {
    zoomHintBtn.addEventListener("click", () => {
      const currentItem = mediaItems[currentIndex];
      if (currentItem && currentItem.type === "image") {
        openLightbox(currentItem.src);
      }
    });
  }

  // Initialize
  setMedia(0, false);
}

// ===================================================================
// 2. DOWNLOAD FLOW & INSTRUCTION MODAL
// ===================================================================
function initDownloadFlow() {
  const downloadBtns = document.querySelectorAll(".btn-trigger-download");
  const modal = document.getElementById("downloadModal");
  const closeBtn = document.getElementById("closeDownloadModal");
  const retryBtn = document.getElementById("retryDownloadBtn");

  downloadBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      triggerDirectExeDownload();
      if (modal) modal.classList.add("active");
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      triggerDirectExeDownload();
    });
  }
}

function triggerDirectExeDownload() {
  const exePath = "SkullHotel.exe";
  const downloadLink = document.createElement("a");
  downloadLink.href = exePath;
  downloadLink.download = "SkullHotel_v1.0.4.exe";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// ===================================================================
// 3. LIGHTBOX FULL RESOLUTION VIEWER
// ===================================================================
function initLightbox() {
  const lightbox = document.getElementById("lightboxModal");
  const closeBtn = document.getElementById("closeLightboxBtn");

  // Attach click to framed images in articles
  const framedImgs = document.querySelectorAll(".framed-game-image img");
  framedImgs.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src));
  });

  if (closeBtn && lightbox) {
    closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target === closeBtn) {
        lightbox.classList.remove("active");
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const dlModal = document.getElementById("downloadModal");
      if (dlModal) dlModal.classList.remove("active");
      if (lightbox) lightbox.classList.remove("active");
    }
  });
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImgFull");
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.add("active");
  }
}

// ===================================================================
// 4. REVIEW VOTES INTERACTION
// ===================================================================
function initReviewVotes() {
  const voteBtns = document.querySelectorAll(".vote-action-btn");
  voteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const countEl = btn.querySelector(".vote-count");
      if (countEl) {
        let count = parseInt(countEl.textContent, 10) || 0;
        if (!btn.classList.contains("voted")) {
          btn.classList.add("voted");
          btn.style.color = "#58a6ff";
          btn.style.borderColor = "#58a6ff";
          countEl.textContent = count + 1;
        } else {
          btn.classList.remove("voted");
          btn.style.color = "";
          btn.style.borderColor = "";
          countEl.textContent = Math.max(0, count - 1);
        }
      }
    });
  });
}

// ===================================================================
// 5. SMOOTH SCROLLING FOR NAVIGATION LINKS
// ===================================================================
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#" && document.querySelector(targetId)) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}
