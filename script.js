/* Edit this file */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚❚';
}

toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);

function handleRangeUpdate() {
  video[this.name] = this.value;
}

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});


function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);

video.addEventListener('error', () => {
  console.error('Unable to load download.mp4');
});