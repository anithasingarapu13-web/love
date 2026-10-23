
/* FIX: OPEN THE INSIDE WEBSITE */

const introSection = document.getElementById("eyesIntro");
const introVideo = document.getElementById("eyesVideo");
const introProgress = document.getElementById("eyesProgress");
const introSong = document.getElementById("introMusic");
const insideSong = document.getElementById("backgroundMusic");
const mainWebsite = document.getElementById("website");
const songText = document.getElementById("songTrigger");

let introIsOver = false;

function openInsideWebsite() {
  if (introIsOver) return;
  introIsOver = true;

  introSong.pause();
  introSong.currentTime = 0;

  mainWebsite.classList.remove("hidden");
  introSection.classList.add("eyes-opening");

  setTimeout(() => introSection.remove(), 1300);

  insideSong.play().catch(() => {
    console.log("Tap the song text to play the inside music.");
  });

  updateInsideSongText();
}

// Open after 10 seconds, even if the video does not finish.
setTimeout(openInsideWebsite, 10000);

// Also open if the video ends early.
introVideo.addEventListener("ended", openInsideWebsite);

// Keep the progress bar moving.
introVideo.addEventListener("playing", () => {
  introProgress.style.animation =
    "eyesProgressRun 10s linear forwards";
});

// Music controls for the inside website.
function updateInsideSongText() {
  if (!songText) return;

  songText.textContent = insideSong.paused
    ? "♡ Touch these words to hear our song ♡"
    : "♫ Our song is playing — touch to pause ♡";
}

async function toggleInsideSong() {
  try {
    if (insideSong.paused) {
      await insideSong.play();
    } else {
      insideSong.pause();
    }
  } catch (error) {
    console.log("Check romantic.mp3 and try again.");
  }

  updateInsideSongText();
}

songText.addEventListener("click", toggleInsideSong);

songText.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleInsideSong();
  }
});

insideSong.addEventListener("play", updateInsideSongText);
insideSong.addEventListener("pause", updateInsideSongText);

const testVideo = document.getElementById("eyesVideo");

testVideo.addEventListener("loadeddata", () => {
  console.log("Video loaded successfully!");
  console.log("Video dimensions:", testVideo.videoWidth, testVideo.videoHeight);
});

testVideo.addEventListener("error", () => {
  console.error("Video error:", testVideo.error);
  console.error("Video source:", testVideo.currentSrc);
});

testVideo.load();
testVideo.play().catch(error => {
  console.error("Playback error:", error.message);
});

const introMusic = document.getElementById("introMusic");
const backgroundMusic = document.getElementById("backgroundMusic");
const eyesIntro = document.getElementById("eyesIntro");
const website = document.getElementById("website");

let introOpened = false;

function playIntroMusic() {
  if (!introOpened) {
    introMusic.play().catch(error => {
      console.log("Intro music needs a click:", error);
    });
  }
}

// Click anywhere to start the intro song.
document.addEventListener("click", playIntroMusic, { once: true });

// Switch to the inside song when the intro ends.
function openWebsite() {
  if (introOpened) return;
  introOpened = true;

  eyesIntro.classList.add("finished");
  website.classList.remove("hidden");

  introMusic.pause();
  introMusic.currentTime = 0;

  backgroundMusic.play().catch(error => {
    console.log("Click to start the romantic song:", error);
  });
}

setTimeout(openWebsite, 10000);

// Click the song text to play or pause the inside song.
document.getElementById("songTrigger").addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch(console.error);
  } else {
    backgroundMusic.pause();
  }
});
