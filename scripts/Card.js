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
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._buttonDelete = this._cardElement.querySelector('.element__button-delete');
    this._buttonLike = this._cardElement.querySelector('.element__button-like');
    this._cardName = this._cardElement.querySelector('.element__title');
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._setEventListeners();
    return this._cardElement;
  }

  _deleteCard () {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _toggleLike () {
    this._buttonLike.classList.toggle('element__button-like_active');
  }

  _openCardImage () {
    openPopup(popupImage);
    zoomedImage.src = this._link;
    zoomedImage.alt = this._name;
    imageName.textContent = this._name;
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });
    this._cardImage.addEventListener('click', () => {
      this._openCardImage();
    });
  }
};