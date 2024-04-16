const songs = [
  {
    name: 'own it',
    artist: 'Stormzy',
    audio: './assets/songs/song1.mp3',
    image: './assets/images/gear1.jpeg'
  },

  {
    name: 'consume',
    artist: 'Chase',
    audio: './assets/songs/song2.mp3',
    image: './assets/images/gear2.jpeg'
  },

  {
    name: 'Band',
    artist: 'Carti',
    audio: './assets/songs/song3.mp3',
    image: './assets/images/gear3.jpeg'
  },

  {
    name: 'Did you see',
    artist: 'Jhus',
    audio: './assets/songs/song4.mp3',
    image: './assets/images/gear4.jpeg'
  },

  {
    name: 'Baby',
    artist: 'Dave',
    audio: './assets/songs/song5.mp3',
    image: './assets/images/gear5.jpeg'
  },
];

const audioElement = new Audio(songs[0].audio);

// const seekSLider = document.getElementById('seekSLider');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
const totalTimeDisplay = document.getElementById('totalTimeDisplay');
const rangeElement = document.getElementById('seekSLider');
const prevIcon = document.getElementById('prevIcon');
const nextIcon = document.getElementById('nextIcon');
const shuffleIcon = document.getElementById('shuffleIcon');
const songNameElement = document.getElementById('songName');
const artistNameElement = document.getElementById('artistName');
const imageElement = document.getElementById('songImage');

let playInterval = null;
let currentSongIndex = 0;

audioElement.load();
audioElement.addEventListener("canplay", () => {
  currentTimeDisplay.innerText = displayTime(audioElement.currentTime);
  totalTimeDisplay.innerText = displayTime(audioElement.duration);
});

function displayTime(time) {
  let seconds = Math.floor(time % 60);
  let foo = time - seconds;
  let min = foo / 60;
  let minutes = Math.floor(min % 60);
  let hours = Math.floor(min / 60);

  if(seconds < 10){
      seconds = "0" + seconds.toString();
  }

  if(minutes < 10){
      minutes = "0" + minutes.toString();
  }

  if(hours > 0){
      return hours + ":" + minutes + ":" + seconds;
  } else {
      return minutes + ":" + seconds;
  }
}

audioElement.addEventListener("playing", () => {
  pauseIcon.style.display = "inline";
  playIcon.style.display = "none";

  playInterval = setInterval(()=>{
    currentTimeDisplay.innerText = displayTime(audioElement.currentTime);
    // totalTimeDisplay.innerText = displayTime(audioElement.duration);

    // range slider logic
    let audioCurrentPosition = audioElement.currentTime * (100 / audioElement.duration);
    rangeElement.value = audioCurrentPosition;

  }, 200);
});

audioElement.addEventListener("pause", () => {
  pauseIcon.style.display = "none";
  playIcon.style.display = "inline";

  clearInterval(playInterval);
})

audioElement.addEventListener("ended", () => {
  pauseIcon.style.display = "none";
  playIcon.style.display = "inline";

  clearInterval(playInterval);
});

function playAudio() {
  audioElement.play().then(
    () => {
      pauseIcon.style.display = "inline";
      playIcon.style.display = "none";
    }
  );
}

function pauseAudio() {
  audioElement.pause();
  pauseIcon.style.display = 'none';
  playIcon.style.display = 'inline';
}

// rangeElement.addEventListener("input", (event) => {
//   // console.log(event);
//   console.log(event.target.value);
//   const lastEmittedValue = event.target.value;
//   const seekCurrentTime = audioElement.duration * (lastEmittedValue / 100);

//   audioElement.currentTime = seekCurrentTime;
// })

function seekAudio(event) {
  // console.log(event.target.value);
  const lastEmittedValue = event.target.value;
  const seekCurrentTime = audioElement.duration * (lastEmittedValue / 100);

  audioElement.currentTime = seekCurrentTime;
}

function loadSong(songIndex) {
  // stops the audio before going to the next audio
  pauseAudio();
  audioElement.currentTime = 0;
  rangeElement.value = 0;

  const song = songs[songIndex];
  audioElement.src = song.audio;
  audioElement.load();
  
  songNameElement.innerText = song.name;
  artistNameElement.innerText = song.artist;
  imageElement.src = song.image;  
}

function nextAudio() {
  const songsLength = songs.length;

  if (currentSongIndex + 1 < songsLength ) {
    currentSongIndex = currentSongIndex + 1
    loadSong(currentSongIndex);
  }
};

function prevAudio() {
  if (currentSongIndex > 0 ) {
    currentSongIndex = currentSongIndex - 1;
    loadSong(currentSongIndex);
  }
};


function shuffleAudio() {
  for (let i = songs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songs[i], songs[j]] = [songs[j], songs[i]];
  }

  currentSongIndex = 0;
  loadSong(currentSongIndex);
}