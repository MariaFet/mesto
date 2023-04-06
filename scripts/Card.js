import {openPopup} from './script.js';
const popupImage = document.querySelector('.popup_type_image');
const zoomedImage = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__image-description');

export class Card {
  constructor (data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getCardTemplate () {
    const newCardTemplate = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return newCardTemplate;
  }

  generateCard () {
    this._cardElement = this._getCardTemplate();
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._cardElement.querySelector('.element__image').alt = this._name;
    this._cardElement.querySelector('.element__image').src = this._link;
    this._setEventListeners();
    return this._cardElement;
  }

  _deleteCard () {
    this._cardElement.remove();
  }

  _toggleLike () {
    this._cardElement.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }

  _openCardImage () {
    openPopup(popupImage);
    zoomedImage.src = this._link;
    zoomedImage.alt = this._name;
    imageName.textContent = this._name;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__button-delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardElement.querySelector('.element__button-like').addEventListener('click', () => {
      this._toggleLike();
    });
    this._cardElement.querySelector('.element__image').addEventListener('click', () => {
      this._openCardImage();
    });
  }
};