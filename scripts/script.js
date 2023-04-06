import {Card} from './Card.js';
import {initialCards} from './constants.js';
import {FormValidator} from './FormValidator.js';

const editButton = document.querySelector('.profile__button-edit');
const popupProfile = document.querySelector('.popup_type_profile');
const closeButton = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfile = popupProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_job');
const cardsContainer = document.querySelector('.elements');
//открытие попапа
export function openPopup (popupToOpen) {
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

//добавление исходных карточек
initialCards.forEach((item) => {
  const card = new Card(item, ('#card-template'));
  const newCard = card.generateCard();
  cardsContainer.append(newCard);
});

//добавление новых карточек
const addButton = document.querySelector('.profile__button-add');
const popupPlace = document.querySelector('.popup_type_place');
const placeInput = popupPlace.querySelector('.popup__input_type_place');
const linkInput = popupPlace.querySelector('.popup__input_type_link');
addButton.addEventListener('click', (evt) => {openPopup(popupPlace)});
function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  const addedCard = {
    name: placeInput.value,
    link: linkInput.value
  };
  const card = new Card(addedCard, ('#card-template'));
  const newCard = card.generateCard();
  cardsContainer.prepend(newCard);
  closePopup(popupPlace);
  placeInput.value = '';
  linkInput.value = '';
};
const formPlace = popupPlace.querySelector('.popup__form');
formPlace.addEventListener('submit', handlePlaceFormSubmit);


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  input: 'popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//включение валидации форм
const ProfileFormValidator = new FormValidator(config, formProfile);
ProfileFormValidator.enableValidation();

const PlaceFormValidator = new FormValidator( config, formPlace);
PlaceFormValidator.enableValidation();