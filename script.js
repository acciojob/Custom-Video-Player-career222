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
  if (!video.duration || isNaN(video.duration)) {
    return;
  }

  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.width = `${percent}%`;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);


function handleRangeUpdate() {
  const value = Number(this.value);

  if (this.name === 'volume') {
    video.volume = value;
  }

  if (this.name === 'playbackRate') {
    video.playbackRate = value;
  }
}

ranges.forEach(range => {
  range.addEventListener('input', handleRangeUpdate);
  range.addEventListener('change', handleRangeUpdate);
});

function skip() {
  video.currentTime += Number(this.dataset.skip);
}

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});



function scrub(e) {
  if (!video.duration) {
    return;
  }

  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);


video.addEventListener('error', () => {
  console.error('Unable to load download.mp4');
});