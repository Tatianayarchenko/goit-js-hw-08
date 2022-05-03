import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateFormData();

function onFormInput(e) {
  const formElements = e.target.form.elements;
  const email = formElements.email.value;
  const message = formElements.message.value;

  const formValue = {
    email,
    message,
  };
  console.log(formValue);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formValue));
}

function populateFormData() {
  const savedImputs = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedImputs) {
    refs.email.value = savedImputs.email;
    refs.message.value = savedImputs.message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  const savedImputs = JSON.parse(localStorage.getItem('feedback-form-state'));
  console.log(savedImputs);

  localStorage.removeItem(STORAGE_KEY);
  refs.form.reset();
}
