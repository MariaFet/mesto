export class Card {
  constructor ({ data, userId, handleCardClick, handleCardDelete, handleCardLike }, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
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
    this._likeCounter = this._cardElement.querySelector('.element__counter-like');
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._setEventListeners();
    this._hideButtonDelete();
    this.setLikes(this._likes);
    this._checkOwner();
    this.deleteLike();
    return this._cardElement;
  }

  _hideButtonDelete () {
    if(this._ownerId !== this._userId) {
      this._buttonDelete.remove();
    }
  }

  setLikes(data) {
    this._likes = data;
    this._likeCounter.textContent = this._likes.length;
  }

  isLiked() {
    return this._likes.some(like => like._id === this._userId);
  }

  _checkOwner() {
    if(this.isLiked) {
      this.addLike();
    } else {
      this.deleteLike();
    }
  }

  deleteLike () {
    this._buttonLike.classList.remove('element__button-like_active');
  }

  addLike () {
    this._buttonLike.classList.add('element__button-like_active');
  }

  deleteCard () {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _toggleLike () {
    this._buttonLike.classList.toggle('element__button-like_active');
  }
  
  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
};