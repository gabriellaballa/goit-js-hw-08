import Player from '@vimeo/player';
import Throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);
const PLAYBACK_TIME_KEY = 'videoplayer-current-time';
const currentTime = localStorage.getItem(PLAYBACK_TIME_KEY)
  ? localStorage.getItem(PLAYBACK_TIME_KEY)
  : 0;
function setCurrentTimeInLocalStorage(event) {
  localStorage.setItem(PLAYBACK_TIME_KEY, event.seconds);
}
iframePlayer.on('timeupdate', Throttle(setCurrentTimeInLocalStorage, 1000));
iframePlayer.setCurrentTime(currentTime);
