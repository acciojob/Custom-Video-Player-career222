const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play/Pause Button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚❚';
}

// Play/Pause button click
toggle.addEventListener('click', togglePlay);

// Update button when video plays/pauses
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);


// Progress Bar
function handleProgress() {
  if (!video.duration || isNaN(video.duration)) {
    return;
  }

  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.width = `${percent}%`;
}

// Update progress bar while video is playing
video.addEventListener('timeupdate', handleProgress);


// Volume / Playback Speed
function handleRangeUpdate() {
  const value = Number(this.value);

  if (this.name === 'volume') {
    video.volume = value;
  }

  if (this.name === 'playbackRate') {
    video.playbackRate = value;
  }
}

// Range input events
ranges.forEach(range => {
  range.addEventListener('input', handleRangeUpdate);
  range.addEventListener('change', handleRangeUpdate);
});


// Skip buttons
function skip() {
  video.currentTime += Number(this.dataset.skip);
}

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});


// Click on progress bar to seek
function scrub(e) {
  if (!video.duration) {
    return;
  }

  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);


// Video error
video.addEventListener('error', () => {
  console.error('Unable to load download.mp4');
});