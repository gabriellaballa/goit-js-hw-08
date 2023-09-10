import * as VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedTime = `${minutes}:${
    remainingSeconds < 10 ? '0' : ''
  }${remainingSeconds}`;
  return formattedTime;
}

function setCurrentTime(videoId, storageKey) {
  const iframe = document.getElementById(videoId);

  try {
    // Initialize the Vimeo player
    const player = new VimeoPlayer.Player(iframe);

    player.on(
      'timeupdate',
      throttle(function (data) {
        const currentTimeInSeconds = data.seconds;
        const formattedTime = formatTime(currentTimeInSeconds);
        localStorage.setItem(storageKey, formattedTime);
      }, 1000) // Update once per second (1000 ms)
    );

    window.addEventListener('load', function () {
      const storedTime = localStorage.getItem(storageKey);
      if (storedTime !== null) {
        const [minutes, seconds] = storedTime.split(':').map(parseFloat);
        const currentTimeInSeconds = minutes * 60 + seconds;
        player.setCurrentTime(currentTimeInSeconds).catch(error => {
          console.error('Could not set playback time:', error);
        });
      }
    });

    window.addEventListener('beforeunload', () => {
      player
        .getCurrentTime()
        .then(currentTimeInSeconds => {
          const formattedTime = formatTime(currentTimeInSeconds);
          localStorage.setItem(storageKey, formattedTime);
        })
        .catch(error => {
          console.error('Could not set playback time:', error);
        });
    });
  } catch (error) {
    console.error('Error initializing Vimeo Player:', error);
  }
}

setCurrentTime('vimeo-player', 'videoplayer-current-time');
