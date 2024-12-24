// Filter functionality
const filters = document.querySelectorAll(".work__item");
const cards = document.querySelectorAll(".work__card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    document.querySelector(".active-work").classList.remove("active-work");
    filter.classList.add("active-work");

    const filterValue = filter.getAttribute("data-filter");

    cards.forEach((card) => {
      if (filterValue === "all" || card.classList.contains(filterValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Pop-up Functionality
const popup = document.querySelector(".portfolio__popup");
const popupClose = document.querySelector(".portfolio__popup-close");
const popupTitle = document.querySelector(".portfolio__popup-title");
const popupDescription = document.querySelector(".portfolio__popup-description");
const popupThumbnail = document.querySelector(".pp__thumbnail img");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("work__button")) {
    const card = e.target.closest(".work__card");
    const title = card.querySelector(".details__title").textContent;
    const description = card.querySelector(".details__description").textContent;
    const thumbnail = card.querySelector(".work__img").src;

    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popupThumbnail.src = thumbnail;

    popup.classList.add("open");
  }
});

popupClose.addEventListener("click", () => {
  popup.classList.remove("open");
});

// Close popup on clicking outside the popup content
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("open");
  }
});

// Slideshow functionality
const slideshows = document.querySelectorAll(".slideshow");

slideshows.forEach((slideshow) => {
  const images = slideshow.querySelectorAll(".slideshow__img");
  let currentIndex = 0;

  function showNextImage() {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image
    images[currentIndex].classList.add("active");
  }

  // Start the slideshow
  images[currentIndex].classList.add("active");
  setInterval(showNextImage, 3000); // Change image every 3 seconds
});

// Highlight active link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120; // Adjust for header height
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });

  // Remove all highlights when on the main page (before sections start)
  if (window.scrollY < sections[0].offsetTop - 120) {
    navLinks.forEach((link) => link.classList.remove("active"));
  }
});

// Smooth scrolling animation for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    const headerHeight = document.querySelector(".top-header").offsetHeight;

    window.scrollTo({
      top: targetSection.offsetTop - headerHeight,
      behavior: "smooth",
    });
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("work__button")) {
    const card = e.target.closest(".work__card");
    const popup = card.querySelector(".carousel-popup");
    const overlay = document.querySelector(".carousel-popup-overlay");
    const items = popup.querySelectorAll(".carousel__item");
    let currentIndex = 0;

    // Open Pop-up and Overlay
    popup.classList.remove("hidden");
    overlay.classList.add("active");
    items.forEach((item, index) => item.classList.toggle("active", index === currentIndex));

    // If the first item is a video, play it automatically
    const firstItem = items[currentIndex];
    if (firstItem.tagName === "VIDEO") {
      firstItem.play();
    }

    const showItem = (index) => {
      items.forEach((item) => {
        if (item.tagName === "VIDEO") {
          item.pause(); // Pause the video when it's not active
        }
        item.classList.remove("active");
      });
      items[index].classList.add("active");

      // If the new item is a video, play it
      if (items[index].tagName === "VIDEO") {
        items[index].play();
      }
    };

    // Carousel Arrows
    const leftArrow = popup.querySelector(".carousel__arrow--left");
    const rightArrow = popup.querySelector(".carousel__arrow--right");

    leftArrow.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering overlay click
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showItem(currentIndex);
    });

    rightArrow.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering overlay click
      currentIndex = (currentIndex + 1) % items.length;
      showItem(currentIndex);
    });

    // Close Popup and Overlay
    const closePopup = popup.querySelector(".carousel-popup__close");
    closePopup.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering overlay click
      popup.classList.add("hidden");
      overlay.classList.remove("active");
      items.forEach((item) => {
        if (item.tagName === "VIDEO") {
          item.pause(); // Stop video playback when the pop-up is closed
        }
      });
    });

    // Close on Outside Click
    overlay.addEventListener("click", () => {
      popup.classList.add("hidden");
      overlay.classList.remove("active");
      items.forEach((item) => {
        if (item.tagName === "VIDEO") {
          item.pause(); // Stop video playback when the overlay is clicked
        }
      });
    });
  }
});