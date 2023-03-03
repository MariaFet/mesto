const editButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const closeButton = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
//открытие попапа
function openPopup (popupToOpen) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupToOpen.classList.add('popup_opened');
};

//кнопка изменения профиля
editButton.addEventListener('click', (evt) => {openPopup(popupProfile)});

//закрытие попапа
function closePopup (popupToClose) {
  popupToClose.classList.remove('popup_opened');
};
const closeButtons = Array.from(document.querySelectorAll('.popup__button-close'));
closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.target.closest('.popup').classList.remove('popup_opened');
  });
});

//форма изменения профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
};
formElement.addEventListener('submit', handleFormSubmit);

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
  newCard.querySelector('.element__title').textContent = card.name;
  newCard.querySelector('.element__image').src = card.link;
  newCard.querySelector('.element__image').alt = card.alt;
  return newCard;
}
const cardsContainer = document.querySelector('.elements');
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card));
});

//функция удаления карточки
const deleteButton = Array.from(document.querySelectorAll('.element__button-delete'));
deleteButton.forEach((item) => {
  item.addEventListener('click', function (evt) {
  evt.target.closest('.element').remove();
  });
});

//функция постановки лайка
const likeButtons = document.querySelectorAll('.element__button-like');
const likeButtonsArray = Array.from(likeButtons);
function getLike (evt) {
  evt.target.classList.toggle('element__button-like_active');
};
likeButtonsArray.forEach((item) => {
  item.addEventListener('click', getLike);
});

//добавление новых карточек
const addButton = document.querySelector('.profile__button-add');
const popupPlace = document.querySelector('.popup_type_place');
addButton.addEventListener('click', (evt) => {openPopup(popupPlace)});
function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  const placeInput = popupPlace.querySelector('.popup__input_type_place').value;
  const linkInput = popupPlace.querySelector('.popup__input_type_link').value;
  const card = {
    name: placeInput,
    link: linkInput,
    alt: placeInput,
  };
  cardsContainer.prepend(createCard(card));
  closePopup(popupPlace);
}
popupPlace.addEventListener('submit', handlePlaceFormSubmit);

//просмотр картинки
const placeImages = Array.from(document.querySelectorAll('.element__image'));
const popupImage = document.querySelector('.popup_type_image');
const zoomedImage = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__image-description');
placeImages.forEach((image) => {
  image.addEventListener('click', (evt) => {
    openPopup(popupImage);
    zoomedImage.src = evt.target.closest('.element__image').src;
    zoomedImage.alt = evt.target.closest('.element__image').alt;
    imageName.textContent = evt.target.closest('.element__image').alt;
  });
});