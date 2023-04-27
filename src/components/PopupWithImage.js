import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (selector) {
    super(selector);
    this._zoomedImage = document.querySelector('.popup__image');
    this._imageName = document.querySelector('.popup__image-description');
  }
  open (card) {
    super.open(); 
    this._zoomedImage.src = card.link;
    this._zoomedImage.alt = card.name;
    this._imageName.textContent = card.name;
  }
}