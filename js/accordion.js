let sizesItem = document.querySelectorAll('.sizes__item');
sizesItem.forEach(item => {
    item.addEventListener('click', function ($event) {
        console.log($event.target.tagName);
        if ($event.target.tagName !== 'P') {
            let sizesActive = document.querySelectorAll('.sizes__item-description_active');
            let p = item.querySelector('.sizes__item-description');
             p.classList.toggle('sizes__item-description_active');
             sizesActive.forEach(i => {
                i.classList.remove('sizes__item-description_active');
            })    
        }  
    })
}) 
// скрипты для видео
const containerVideo = document.querySelector('.video');
const video = containerVideo.querySelector('video');
const playpause = containerVideo.querySelector('.video__playpause');
const play = containerVideo.querySelector('.video__play');
const controls = containerVideo.querySelector('.video__controls');
const total = containerVideo.querySelector('.video__total');
const progress = containerVideo.querySelector('.video__current');
const dynamic = containerVideo.querySelector('.video__volume-control');
const volume = containerVideo.querySelector('.video__volume-progress');
const volumeProgress = volume.firstElementChild;

playpause.addEventListener('click', togglePlay);
play.addEventListener('click', togglePlay);
video.addEventListener('play', playPause);
video.addEventListener('pause', playPause);
total.addEventListener('click', setCurrentTime);
video.addEventListener('timeupdate', timeUpdate);
dynamic.addEventListener('click', mute);
volume.addEventListener('click', setVolume);

function setVolume(e) {
    volumeProgress.style.width = `${e.offsetX}px`;
    console.log(e.offsetX / volume.clientWidth)
    video.volume = e.offsetX / volume.clientWidth;
    volumeProgress.style.background = "#E01F3D";
}

function mute(e) {
    dynamic.classList.toggle('muted');
    console.log(video.muted)
    video.muted = !video.muted;
    volumeProgress.style.width = 0;
}

function playPause() {
    controls.classList.toggle('paused');
}

function togglePlay() {
    video.paused ?  video.play() : video.pause();
}

function setCurrentTime(e) {
    const offsetX = e.offsetX / total.clientWidth;
    console.log(offsetX * video.duration)
    video.currentTime = offsetX * video.duration;
}

function timeUpdate() {
    console.log('up')
    const progressTime = video.currentTime / video.duration;

    progress.style.width = `${progressTime * total.clientWidth}px`;
    progress.style.background = "#E01F3D";
}