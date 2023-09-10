import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

// Funcție pentru a salva starea în Local Storage
const saveStateToLocalStorage = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(state));
}, 500); // Actualizare la fiecare 500 ms

// Funcție pentru a popula câmpurile cu datele din Local Storage la încărcarea paginii
function populateFormFields() {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const state = JSON.parse(storedState);
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
}

// Încărcați starea la încărcarea paginii
window.addEventListener('load', populateFormFields);

// Ascultați evenimentul "input" pentru a salva starea
emailInput.addEventListener('input', saveStateToLocalStorage);
messageInput.addEventListener('input', saveStateToLocalStorage);

// Ascultați evenimentul "submit" pentru formular
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  // Obțineți starea curentă din Local Storage și afișați-o în consolă
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const state = JSON.parse(storedState);
    console.log('Starea curentă a formularului:', state);
  }

  // Ștergeți datele din Local Storage
  localStorage.removeItem('feedback-form-state');
});
