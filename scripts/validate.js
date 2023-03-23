//отображение ошибки
function showInputError (form, input, config, errorMessage) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  inputError.classList.add(config.errorClass);
  inputError.textContent = errorMessage;
};

//скрытие ошибки
function hideInputError (form, input, config) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  inputError.classList.remove(config.errorClass);
  inputError.textContent = '';
};

//проверка валидности поля ввода(отображение и скрытие ошибки)
function isValid(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config, input.validationMessage);
  } else {
    hideInputError(form, input, config);
  }
};

//проверка есть ли в форме хоть одно невалидное поле
function hasInvalidInput (inputList) {
  return inputList.some((element) => {
    return !element.validity.valid;
  });
};

//переключение состояния кнопки
function toggleButtonState (inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled', true);
  }
};

//слушатели для всех полей ввода формы
function setEventListeners (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonSubmit, config);
  inputList.forEach((element) => {
    element.addEventListener('input', () => {
      isValid(form, element, config);
      toggleButtonState(inputList, buttonSubmit, config);
    });
  });
};

//слушатели для всех форм
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      const inputList = Array.from(form.querySelectorAll(config.inputSelector));
      const buttonSubmit = form.querySelector(config.submitButtonSelector);
      toggleButtonState(inputList, buttonSubmit, config);
    });
    setEventListeners(form, config);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});