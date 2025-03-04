let time = document.querySelector(".time");

let closeMusic = document.querySelector(".caret-down");
let nowPlaying = document.querySelector(".now-playing");
let showPlaylist = document.querySelector(".play-list");

let trackArt = document.querySelector(".track-image");
let trackName = document.querySelector(".song-title");
let trackArtist = document.querySelector(".artist");
let removePlaylist = document.querySelector(".remove");
let addPlaylist = document.querySelector(".add");

let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let trackProgress = document.querySelector(".progress");

let shuffleBtn = document.querySelector(".shuffle");
let prevBtn = document.querySelector(".prev-btn");
let playPauseBtn = document.querySelector(".play-pause");
let nextBtn = document.querySelector(".nextbtn");
let repeatBtn = document.querySelector(".repeat");

let trackIndex = 0;
let isPlaying = false;
let updateTimer;

let currentTrack = document.createElement('audio');


let trackList = [
    {
        name: "Thankful",
        artist: "Wizkid",
        image: "images/wizkid.jpg",
        path: "playlist/Thankful.mp3"
    },
    {
        name: "Fountain",
        artist: "Drake",
        image: "images/drake.webp",
        path: "playlist/fountain.mp3"
    },
    {
        name: "Pipe Down",
        artist: "Drake",
        image: "images/drake.webp",
        path: "playlist/pipe-down.mp3"
    }
];


function realTime(){
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const currentTime = `${hours}:${minutes}`;

    time.textContent = currentTime;

    setTimeout(realTime, 1000);
}

function loadTrack(trackIndex){
    clearInterval(updateTimer);
    resetValues();

    currentTrack.src = trackList[trackIndex].path;
    currentTrack.load();

    trackArt.src = trackList[trackIndex].image;
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    nowPlaying.textContent = "Playing " + (trackIndex + 1) + " of " + trackList.length;

    updateTimer = setInterval(seekUpdate, 1000);

    currentTrack.addEventListener("ended", nextTrack);
    randomImgColor();
}


function randomImgColor(){
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;


    let imgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

    document.body.style.background = imgColor;
}

function resetValues(){
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    trackProgress.value = 0;
}



function playPauseTrack(){
    if(!isPlaying){
        playTrack();
    }
    else{
        pauseTrack();
    }
}

function playTrack(){
    currentTrack.play();
    isPlaying = true;

    playPauseBtn.innerHTML = '<i class="fa fa-pause fa-3x"></i>';
}

function pauseTrack(){
    currentTrack.pause();
    isPlaying = false;

    playPauseBtn.innerHTML = '<i class="fa fa-play fa-3x"></i>';
}
function nextTrack(){
    if(trackIndex < trackList.length - 1){
        trackIndex += 1;
    } 
    else{
        trackIndex =0;
    }
    loadTrack(trackIndex);
    playTrack();
}
function prevTrack(){
    if(trackIndex > 0){
        trackIndex -= 1;
    }
    else{
        trackIndex = trackList.length - 1;
    }
    loadTrack(trackIndex);
    playTrack();
}


// function seekTo() {
//     seekto = currentTrack.duration * (trackProgress.value / 100);

//     currentTrack.currentTime = seekto;
// }




function seekUpdate(){
    let seekPosition = 0;

    if (!isNaN(currentTrack.duration)) {
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        trackProgress.value = seekPosition;


        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration -  durationMinutes * 60);

        if(currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if(durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if(currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if(durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}


playPauseBtn.addEventListener("click", playPauseTrack);
prevBtn.addEventListener("click", prevTrack)
nextBtn.addEventListener("click", nextTrack);
realTime();
loadTrack(trackIndex);
