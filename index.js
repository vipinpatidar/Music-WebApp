// Initialize the application
console.log("Spotify clone is running");

// Global variables
let songIndex = 0;
let audioElement = new Audio();
let isPlaying = false;
let songs = [
  {
    songName: "No Love [By VMB]",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Raatan Lambiyan Song [By VMB]",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Elevated [By VMB]",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "The Night We Met [By VMB]",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Hymn For The Weekend [By VMB]",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "KOI JAYE TO LE AAYE [By VMB]",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "CHIDIYA - VILEN [By VMB]",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Milne Hai Mujhse Aai [By VMB]",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "MOH MOH KE DHAAGE [By VMB]",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Let Me Love You [By VMB]",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// DOM Elements
const masterPlay = document.getElementById("masterPlay");
const myProgressBar = document.getElementById("myProgressBar");
const gif = document.getElementById("gif");
const masterSongName = document.getElementById("masterSongName");
const songItems = Array.from(document.querySelectorAll(".songItem"));
const songIconPlay = Array.from(document.querySelectorAll(".songIconPlay"));
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const currentTimeEl =
  document.getElementById("currentTime") || document.createElement("span");
const durationEl =
  document.getElementById("duration") || document.createElement("span");
const volumeControl =
  document.getElementById("volumeControl") || document.createElement("input");

// Initialize the player
function initPlayer() {
  // Load first song
  loadSong(songIndex);

  // Update song list UI
  updateSongList();

  // Set initial volume
  if (volumeControl.tagName === "INPUT") {
    audioElement.volume = 0.7;
    volumeControl.value = 70;
  }
}

// Update song list with images and names
function updateSongList() {
  songItems.forEach((element, i) => {
    const img = element.querySelector("img");
    const songNameEl = element.querySelector(".songName");

    if (img) img.src = songs[i].coverPath;
    if (songNameEl) songNameEl.innerText = songs[i].songName;
  });
}

// Load song data
function loadSong(index) {
  audioElement.src = songs[index].filePath;
  masterSongName.innerHTML = songs[index].songName;
  audioElement.load();
}

// Play/Pause toggle function
function togglePlay() {
  if (isPlaying) {
    pauseSong();
    resetAllSongIcons();
  } else {
    playSong();
    updateActiveSong();
  }
}

// Play song function
function playSong() {
  audioElement.play();
  isPlaying = true;
  updatePlayPauseUI(true);
}

// Pause song function
function pauseSong() {
  audioElement.pause();
  isPlaying = false;
  updatePlayPauseUI(false);
}

// Update UI for play/pause state
function updatePlayPauseUI(playing) {
  if (playing) {
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = "1";
  } else {
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = "0";
  }
}

// Reset all song item icons to play
function resetAllSongIcons() {
  songIconPlay.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
}

// Update active song in the list
function updateActiveSong() {
  resetAllSongIcons();
  const currentSongIcon = document.getElementById(songIndex.toString());
  if (currentSongIcon) {
    currentSongIcon.classList.remove("fa-play-circle");
    currentSongIcon.classList.add("fa-pause-circle");
  }
}

// Format time in MM:SS
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;
}

// Play next song
function playNext() {
  songIndex = (songIndex + 1) % songs.length;
  console.log(songIndex);
  loadSong(songIndex);
  playSong();
  updateActiveSong();
}

// Play previous song
function playPrevious() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
  updateActiveSong();
}

// Event Listeners
masterPlay.addEventListener("click", togglePlay);

myProgressBar.addEventListener("input", () => {
  const seekTime = (myProgressBar.value * audioElement.duration) / 100;
  audioElement.currentTime = seekTime;
});

// Volume control
if (volumeControl.tagName === "INPUT") {
  volumeControl.addEventListener("input", () => {
    audioElement.volume = volumeControl.value / 100;
  });
}

// Song progress update
audioElement.addEventListener("timeupdate", () => {
  // Update progress bar
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = isNaN(progress) ? 0 : progress;

  // Update time displays
  if (currentTimeEl)
    currentTimeEl.textContent = formatTime(audioElement.currentTime);
  if (durationEl && !isNaN(audioElement.duration)) {
    durationEl.textContent = formatTime(audioElement.duration);
  }
});

// When song ends, play next song
audioElement.addEventListener("ended", playNext);

// Song item click handlers
songIconPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    const clickedIndex = parseInt(e.target.id);

    if (songIndex === clickedIndex && isPlaying) {
      // If clicking on currently playing song, pause it
      pauseSong();
      resetAllSongIcons();
    } else {
      // Otherwise, play the clicked song
      songIndex = clickedIndex;
      loadSong(songIndex);
      playSong();
      updateActiveSong();
    }
  });
});

// Previous and Next buttons
previousBtn.addEventListener("click", playPrevious);
nextBtn.addEventListener("click", playNext);

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Space":
      e.preventDefault();
      togglePlay();
      break;
    case "ArrowRight":
      playNext();
      break;
    case "ArrowLeft":
      playPrevious();
      break;
  }
});

// Initialize the player when page loads
window.addEventListener("load", initPlayer);
