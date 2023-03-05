const editButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const closeButton = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const popupImage = document.querySelector('.popup_type_image');
//открытие попапа
function openPopup (popupToOpen) {
  popupToOpen.classList.add('popup_opened');
};

//кнопка изменения профиля
editButton.addEventListener('click', (evt) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
});

//закрытие попапа
function closePopup (evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
};
const closeButtons = Array.from(document.querySelectorAll('.popup__button-close'));
closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt);
  });
});

//форма изменения профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(evt);
};
formElement.addEventListener('submit', handleFormSubmit);

//удаление карточек
function initCardDelete (card) {
  const deleteButton = card.querySelector('.element__button-delete');
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
};

//лайк
function makeLike (card) {
  const likeButton = card.querySelector('.element__button-like');
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
  });
};

//просмотр изображений
function openImage (card) {
  const cardImage = card.querySelector('.element__image');
  const zoomedImage = document.querySelector('.popup__image');
  const imageName = document.querySelector('.popup__image-description');
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
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Горы Архыза'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Заснеженная река в Челябинской области'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Многоэтажки в Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Вулкан на Камчатке'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога в Холмогорском районе'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал зимой'
  }
]; 
function createCard (card) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.element__image');
  const newCardName = newCard.querySelector('.element__title');
  newCardName.textContent = card.name;
  newCardImage.src = card.link;
  newCardImage.alt = card.alt;
  initCardDelete(newCard);
  makeLike(newCard);
  openImage(newCard);
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
  closePopup(evt);
}
popupPlace.addEventListener('submit', handlePlaceFormSubmit);