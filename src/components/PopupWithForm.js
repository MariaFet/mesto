import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (selector, { handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__button-submit');
    this._submitButtonInitialText = this._submitButton.textContent;
  }

  _getInputValues () {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close () {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, text) {
    if(isLoading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this._submitButtonInitialText;
    }
  }
}