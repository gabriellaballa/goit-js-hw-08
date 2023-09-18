import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
const startButton = document.querySelector('[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Notiflix.Notify.warning('Please choose a future date!');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const datetimePicker = flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function calculateTimeDifference(selectedDate) {
  const currentTime = new Date().getTime();
  const selectedTime = selectedDate.getTime();
  return selectedTime - currentTime;
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function updateCountdown() {
  const selectedDate = datetimePicker.selectedDates[0];
  const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };
  if (selectedDate) {
    const countdownInterval = setInterval(() => {
      const timeDifference = calculateTimeDifference(selectedDate);

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        Notiflix.Notify.success('The timer has reached 00:00:00:00.');
      } else {
        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        timerFields.days.textContent = addLeadingZero(days);
        timerFields.hours.textContent = addLeadingZero(hours);
        timerFields.minutes.textContent = addLeadingZero(minutes);
        timerFields.seconds.textContent = addLeadingZero(seconds);
      }
    }, 1000);
  }
}

startButton.addEventListener('click', updateCountdown);
