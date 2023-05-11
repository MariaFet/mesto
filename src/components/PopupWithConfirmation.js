import {Popup} from './Popup.js';
export class PopupWithConfirmation extends Popup {
  constructor(selector, {handleSubmit}) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._confirmButton = this._popup.querySelector('.popup__button-submit');
    this._setEventListener = this._setEventListener.bind(this);
  }

  handleSubmitConfirmation(submitConfirmation) {
    this._handleSubmit = submitConfirmation;
  }

  open() {
    super.open();
    this._confirmButton.textContent = 'Да';
    this._confirmButton.addEventListener('click', this._setEventListener);
  }

  close() {
    super.close();
    this._confirmButton.removeEventListener('click', this._setEventListener);
  }

  _setEventListener (evt) {
    evt.preventDefault();
    this._handleSubmit();
    this._confirmButton.textContent = 'Удаление...';
  }
}