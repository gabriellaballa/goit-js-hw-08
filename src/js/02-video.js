import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

// Select the iframe element for the player
const iframe = document.querySelector('#vimeo-player');

try {
  // Initialize the Vimeo player
  const player = new Vimeo.Player(iframe);

  // Add the 'timeupdate' event and use throttle to update the playback time in Local Storage
  player.on(
    'timeupdate',
    throttle(function (data) {
      const currentTimeInSeconds = data.seconds;
      localStorage.setItem(
        'videoplayer-current-time',
        currentTimeInSeconds.toString()
      );
    }, 500)
  ); // Update once per second (1000 ms)

  // On page load, check if there is saved time in Local Storage and, if so, set the playback time to the saved position
  window.addEventListener('load', function () {
    const storedTime = localStorage.getItem('videoplayer-current-time');
    if (storedTime !== null) {
      const currentTimeInSeconds = parseFloat(storedTime);
      player.setCurrentTime(currentTimeInSeconds).catch(error => {
        console.error('Could not set playback time:', error);
      });
    }
  });
} catch (error) {
  console.error('Error initializing Vimeo Player:', error);
}
