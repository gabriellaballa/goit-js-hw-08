import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

const saveStateToLocalStorage = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(state));
}, 500); 
function populateFormFields() {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const state = JSON.parse(storedState);
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
}


window.addEventListener('load', populateFormFields);

emailInput.addEventListener('input', saveStateToLocalStorage);
messageInput.addEventListener('input', saveStateToLocalStorage);

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const state = JSON.parse(storedState);
    console.log('Starea curentă a formularului:', state);
  }

  localStorage.removeItem('feedback-form-state');
});
