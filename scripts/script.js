const editButton = document.querySelector('.profile__button-edit');
const popupProfile = document.querySelector('.popup_type_profile');
const closeButton = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfile = popupProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_job');
const popupImage = document.querySelector('.popup_type_image');
const zoomedImage = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__image-description');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.element');
//открытие попапа
function openPopup (popupToOpen) {
  popupToOpen.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

//закрытие по Esc
function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//закрытие по клику на оверлей
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});

//кнопка изменения профиля
editButton.addEventListener('click', (evt) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
});

//закрытие попапа
function closePopup (popupToClose) { 
  popupToClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}; 

const closeButtons = Array.from(document.querySelectorAll('.popup__button-close'));
closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

//форма изменения профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
};
formProfile.addEventListener('submit', handleFormSubmit);

//удаление карточек
function initCardDelete (card) {
  const deleteButton = card.querySelector('.element__button-delete');
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
};

//лайк
function initMakeLike (card) {
  const likeButton = card.querySelector('.element__button-like');
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
  });
};

//просмотр изображений
function initOpenCardImage (card) {
  const cardImage = card.querySelector('.element__image');
  cardImage.addEventListener('click', (evt) => {
    openPopup(popupImage);
    zoomedImage.src = evt.target.src;
    zoomedImage.alt = evt.target.alt;
    imageName.textContent = evt.target.alt;
  });
};

//добавление исходных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
function createCard (card) {
  const newCard = cardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.element__image');
  const newCardName = newCard.querySelector('.element__title');
  newCardName.textContent = card.name;
  newCardImage.src = card.link;
  newCardImage.alt = card.name;
  initCardDelete(newCard);
  initMakeLike(newCard);
  initOpenCardImage(newCard);
  return newCard;
};
const cardsContainer = document.querySelector('.elements');
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card));
});

//добавление новых карточек
const addButton = document.querySelector('.profile__button-add');
const popupPlace = document.querySelector('.popup_type_place');
const placeInput = popupPlace.querySelector('.popup__input_type_place');
const linkInput = popupPlace.querySelector('.popup__input_type_link');
addButton.addEventListener('click', (evt) => {openPopup(popupPlace)});
function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
    alt: placeInput.value,
  };
  cardsContainer.prepend(createCard(card));
  closePopup(popupPlace);
  placeInput.value = '';
  linkInput.value = '';
};
const formPlace = popupPlace.querySelector('.popup__form');
formPlace.addEventListener('submit', handlePlaceFormSubmit);