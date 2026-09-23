/* ===================================================================
   SKULL HOTEL - OFFICIAL GAME DOWNLOAD PORTAL JAVASCRIPT
   Clean, Professional & Production-Ready
   Video Trailer, Banner Carousel, Exe Download Modal & Lightbox
   =================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMediaShowcase();
  initDownloadFlow();
  initLightbox();
  initReviewVotes();
  initSmoothScroll();
});

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
