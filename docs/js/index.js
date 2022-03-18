const audio = document.querySelector(".audio");
const songName = document.querySelector('.song-name')
const artistName = document.querySelector('.artist-name')
const player = document.querySelector('.container')
const play = document.querySelector('.play')
const trackLogo = document.querySelector('.track-logo')
const backLogo = document.querySelector('.background')
const progressBar = document.querySelector('.song-progress')
const endTrack = document.querySelector('.track-end')
const nowTrack = document.querySelector('.track-now')
// let arrPlayPause = [play.src = "assets/svg/pause.png", play.src = "assets/svg/play.png"];

// Songs swap
const songs = ['beyonce', 'dontstartnow'];
const songsName = ["Don't Hurt Yourself", "Don't Start Now"];
const artistsName = ["Beyonce", "Dua Lipa"];
let songIndex = 0;

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const loadSong = (song) => {
    songName.innerHTML = songsName[songIndex];
    artistName.innerHTML = artistsName[songIndex];
    audio.src= `assets/audio/${song}.mp3`;
    trackLogo.src = `assets/img/cover${songIndex+1}.png`;
    backLogo.src = `assets/img/cover${songIndex+1}.png`;
}
loadSong(songs[songIndex])


const playSong = () => {
    player.classList.add('pp');
    trackLogo.classList.add('active')
    play.src="assets/svg/pause.png"
    audio.play()
}
const pauseSong = () => {
    player.classList.remove('pp');
    trackLogo.classList.remove('active')
    audio.pause()
    play.src="assets/svg/play.png"
}
const playPause = () => {
    const isPlaying = player.classList.contains('pp')
        if (isPlaying) {
            pauseSong()
        } else {
            playSong()
        }
}

const nextSong = () => {
    songIndex++;
    play.src="assets/svg/play.png"
    if (songIndex >= songs.length) songIndex=0
    loadSong(songs[songIndex])
    playSong()
}

const updateProgress = () => {
    if (!isNaN(audio.duration)) {
        progressBar.max = Math.floor(audio.duration)
        endTrack.innerHTML = calculateTime(audio.duration)
    } else {
        audio.addEventListener('loadedmetadata', () => {
            progressBar.max = Math.floor(audio.duration)
            endTrack.innerHTML = calculateTime(audio.duration)
        })
    }
};
audio.addEventListener('timeupdate', updateProgress);


const nowProgress = () => {
    if (!isNaN(audio.currentTime)) {
        progressBar.value = Math.floor(audio.currentTime)
        nowTrack.innerHTML = calculateTime(audio.currentTime)
    } else {
        audio.addEventListener('loadedmetadata', () => {
            progressBar.value = Math.floor(audio.currentTime)
            nowTrack.innerHTML = calculateTime(audio.currentTime)
        })
    }
}
audio.addEventListener('timeupdate', nowProgress)

progressBar.addEventListener('input', () => {
    nowTrack.textContent = calculateTime(progressBar.value);
});

changeProgressBar = () => audio.currentTime = progressBar.value;

audio.addEventListener('ended', nextSong)
