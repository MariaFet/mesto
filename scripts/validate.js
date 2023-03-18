//отображение ошибки
function showInputError (formElement, element, errorMessage) {
  const errorClass = element.nextElementSibling;
  element.classList.add('popup__input_type_error');
  errorClass.textContent = errorMessage;
};

//скрытие ошибки
function hideInputError (formElement, element) {
  const errorClass = element.nextElementSibling;
  //const errorClass = formElement.querySelector(`.${element.id}-error`);
  element.classList.remove('popup__input_type_error');
  errorClass.textContent = '';
};

//проверка валидности поля ввода(отображение и скрытие ошибки)
function isValid (formElement, element) {
  if (!element.validity.valid) {
    showInputError(formElement, element, element.validationMessage);
  } else {
    hideInputError(formElement, element);
  }
};

//проверка есть ли в форме хоть одно невалидное поле
function hasInvalidInput (inputList) {
  return inputList.some((element) => {
    return !element.validity.valid;
  });
};

//переключение состояния кнопки
function toggleButtonState (inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__button-submit_disabled');
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove('popup__button-submit_disabled');
    button.removeAttribute('disabled', true);
  }
};

//слушатели для всех полей ввода формы
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonSubmit = formElement.querySelector('.popup__button-submit');
  toggleButtonState(inputList, buttonSubmit);
  inputList.forEach((element) => {
    element.addEventListener('input', () => {
      isValid(formElement, element);
      toggleButtonState(inputList, buttonSubmit);
    });
  });
};

//слушатели для всех форм
function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

enableValidation();