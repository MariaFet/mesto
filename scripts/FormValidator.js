export class FormValidator {
  constructor (config, form) {
    this._formSelector = config.formSelector,
    this._inputSelector = config.inputSelector,
    this._input = config.input,
    this._submitButtonSelector = config.submitButtonSelector,
    this._inactiveButtonClass = config.inactiveButtonClass,
    this._inputErrorClass = config.inputErrorClass,
    this._errorClass = config.errorClass,
    this._form = form
  }

  _showInputError (input, errorMessage){
    const inputError = this._form.querySelector(`.popup__error_type_${input.name}`);
    input.classList.add(this._inputErrorClass);
    inputError.classList.add(this._errorClass);
    inputError.textContent = errorMessage;
  };

  _hideInputError (input) {
    const inputError = this._form.querySelector(`.popup__error_type_${input.name}`);
    input.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorClass);
    inputError.textContent = '';
  };

  _isValid (input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((element) => {
      return !element.validity.valid;
    });
  };

  _toggleButtonState (inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled', true);
    }
  };

  _setEventListeners () {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonSubmit);
    inputList.forEach((element) => {
      element.addEventListener('input', () => {
        this._isValid(element);
        this._toggleButtonState(inputList, buttonSubmit);
      });
    });
  };

  enableValidation () {
    this._form.addEventListener('submit', () => {
      const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      const buttonSubmit = this._form.querySelector(this._submitButtonSelector);
      this._toggleButtonState(inputList, buttonSubmit);
    });
    this._setEventListeners();
  }
};