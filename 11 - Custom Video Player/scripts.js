const palyer = document.querySelector('.player');
const video = palyer.querySelector('.viewer');
const progress = palyer.querySelector('.progress');
const progressBar = palyer.querySelector('.progress__filled');
const toggle = palyer.querySelector('.toggle');
const fsToggle = palyer.querySelector('.fs');
const skipButtons = palyer.querySelectorAll('[data-skip]');
const ranges = palyer.querySelectorAll('.player__slider');

function togglePlay() {
    if (video.paused) {
        return video.play();
    }
    return video.pause();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    const skip = this.dataset.skip;
    video.currentTime += parseFloat(skip);
}

function handleRangeUpdate() {
    const value = this.value;
    const name = this.name;
    video[name] = value;
}

function handlePogress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = scrubTime;
}

function isVideoInFullsreen() {
    return document.fullscreenElement && document.fullscreenElement === video
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (video.mozExitFullscreen) {
        document.mozExitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function enterFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

function fullScreenToggle() {
    if (isVideoInFullsreen()) {
        return exitFullScreen()
    }
    enterFullScreen();
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// video.addEventListener('progress', handlePogress);
video.addEventListener('timeupdate', handlePogress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(i => i.addEventListener('click', skip));

ranges.forEach(i => i.addEventListener('change', handleRangeUpdate));
ranges.forEach(i => i.addEventListener('mousemove', handleRangeUpdate));

progressBar.addEventListener('click', scrub);

let mousedown = false;
progressBar.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fsToggle.addEventListener('click', fullScreenToggle);