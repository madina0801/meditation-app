const app = () => {
  const song = document.querySelector(".track");
  const playBtn = document.querySelector(".play-btn");
  const video = document.querySelector(".vid-container video");
  const outline = document.querySelector(".moving-outline circle");

  // Sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  // Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  // Get the length of the outline
  const outlineLength = outline.getTotalLength();

  // Duration
  let duration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Pick different sound and video
  sounds.forEach(sound => {
	sound.addEventListener('click', function() {
		song.src = this.getAttribute('data-sound');
		video.src = this.getAttribute('data-video');
		player(song);
	})
  })

  // Play sound
  playBtn.addEventListener("click", function () {
    player(song);
  });

  // Play and stop sound
  const player = function (song) {
    if (song.paused) {
      song.play();
      video.play();
      playBtn.src = "./imgs/pause.svg";
    } else {
      song.pause();
      video.pause();
      playBtn.src = "./imgs/play.svg";
    }
  };
  // Select time
  timeSelect.forEach((time) => {
    time.addEventListener("click", function () {
      duration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(
        duration % 60
      )}`;
    });
  });

  // Animate circle
  song.ontimeupdate = function () {
    let currentTime = song.currentTime;
    let elapsedTime = duration - currentTime;
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);

    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Change minutes and seconds
    timeDisplay.textContent = `${minutes}:${seconds}`;

    // Prevent time from going negative
    if (currentTime >= duration) {
      song.pause();
      currentTime = 0;
      playBtn.src = "./imgs/play.svg";
      video.pause();
    }
  };
};

app();
