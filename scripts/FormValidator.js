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

  _hasInvalidInput () {
    return this._inputList.some((element) => {
      return !element.validity.valid;
    });
  };

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
      this._buttonSubmit.setAttribute('disabled', true);
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
      this._buttonSubmit.removeAttribute('disabled', true);
    }
  };

  _setEventListeners () {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((element) => {
      element.addEventListener('input', () => {
        this._isValid(element);
        this._toggleButtonState();
      });
    });
  };

  enableValidation () {
    this._form.addEventListener('submit', () => {
      this._toggleButtonState();
    });
    this._setEventListeners();
  }
};