// Spotify Clone - JavaScript Interactivity

// DOM Elements
const playBtn = document.querySelector(".play-btn");
const progressBar = document.querySelector(".progress-bar");
const currTimeEl = document.querySelector(".curr-time");
const totTimeEl = document.querySelector(".tot-time");
const navOptions = document.querySelectorAll(".nav-option");
const cards = document.querySelectorAll(".card");

// Player State
let isPlaying = false;
let currentTime = 0;
let duration = 213; // 3:33 in seconds

// Initialize event listeners
function init() {
  setupPlayerControls();
  setupNavigation();
  setupCardInteractions();
  setupProgressBar();
}

// Player Controls
function setupPlayerControls() {
  playBtn.addEventListener("click", togglePlayPause);
}

function togglePlayPause() {
  isPlaying = !isPlaying;
  const playIcon = playBtn.querySelector("img");

  if (isPlaying) {
    playIcon.style.opacity = "1";
    simulatePlayback();
    console.log("Playing...");
  } else {
    playIcon.style.opacity = "0.7";
    console.log("Paused");
  }
}

// Simulate playback progression
function simulatePlayback() {
  const interval = setInterval(() => {
    if (!isPlaying) {
      clearInterval(interval);
      return;
    }

    currentTime += 0.1;
    if (currentTime >= duration) {
      currentTime = 0;
      isPlaying = false;
    }

    updateProgressDisplay();
    progressBar.value = (currentTime / duration) * 100;
  }, 100);
}

// Update time display
function updateProgressDisplay() {
  currTimeEl.textContent = formatTime(currentTime);
}

// Format seconds to MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

// Progress bar interaction
function setupProgressBar() {
  progressBar.addEventListener("input", (e) => {
    currentTime = (e.target.value / 100) * duration;
    updateProgressDisplay();
  });
}

// Navigation - Active state
function setupNavigation() {
  navOptions.forEach((option) => {
    option.addEventListener("click", () => {
      navOptions.forEach((opt) => opt.classList.remove("nav-option-active"));
      option.classList.add("nav-option-active");

      const label =
        option.querySelector("span")?.textContent || "Navigation clicked";
      console.log(`Navigating to: ${label}`);
    });
  });
}

// Card Interactions
function setupCardInteractions() {
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector(".card-title").textContent;
      const info = card.querySelector(".card-info").textContent;
      console.log(`Playing: ${title} - ${info}`);
      playCardContent(title, info);
    });

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(-4px) scale(1)";
    });
  });
}

function playCardContent(title, artist) {
  isPlaying = true;
  currentTime = 0;
  console.log(`Now playing: ${title} by ${artist}`);
  simulatePlayback();
}

// Button Interactions
function setupButtonInteractions() {
  const playerControlButtons = document.querySelectorAll(
    ".player-control-icon"
  );

  playerControlButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const ariaLabel = btn.getAttribute("aria-label");
      handlePlayerControl(ariaLabel);
    });
  });
}

function handlePlayerControl(control) {
  switch (control) {
    case "Shuffle":
      console.log("Shuffle toggled");
      break;
    case "Previous track":
      currentTime = 0;
      updateProgressDisplay();
      console.log("Playing previous track");
      break;
    case "Play/Pause":
      togglePlayPause();
      break;
    case "Next track":
      currentTime = 0;
      updateProgressDisplay();
      console.log("Playing next track");
      break;
    case "Repeat":
      console.log("Repeat mode toggled");
      break;
  }
}

// Badge Button Interactions
function setupBadgeButtons() {
  const badgeButtons = document.querySelectorAll(".badge");

  badgeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.textContent.trim();
      console.log(`Button clicked: ${text}`);

      if (text === "Create playlist") {
        showNotification("Playlist creation feature coming soon!");
      } else if (text === "Browse podcasts") {
        showNotification("Podcast browsing feature coming soon!");
      } else if (text === "Explore Premium") {
        showNotification("Upgrading to Premium!");
      } else if (text === "Install App") {
        showNotification("Opening app store...");
      }
    });
  });
}

// Notification System
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #1db954;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      togglePlayPause();
    }
  });
}

// Search Functionality
function setupSearch() {
  const searchBtn = document.querySelector(".nav-option:nth-child(2)");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = prompt("Search for songs, artists, playlists...");
      if (query) {
        console.log(`Searching for: ${query}`);
        showNotification(`Searching for "${query}"...`);
      }
    });
  }
}

// User Menu
function setupUserMenu() {
  const userBtn = document.querySelector(".user-btn");
  if (userBtn) {
    userBtn.addEventListener("click", () => {
      showNotification("User menu - Profile, Settings, Logout");
    });
  }
}

// Add CSS animation styles
function addAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  addAnimationStyles();
  init();
  setupPlayerControlButtons();
  setupBadgeButtons();
  setupKeyboardShortcuts();
  setupSearch();
  setupUserMenu();

  console.log("Spotify Clone - JavaScript initialized");
});

// Prevent text selection on double-click for better UX
document.addEventListener("selectstart", (e) => {
  if (e.target.closest("button") || e.target.closest(".card")) {
    e.preventDefault();
  }
});

// Log version info
console.log(
  "%cSpotify Clone v1.0",
  "color: #1db954; font-size: 16px; font-weight: bold;"
);
