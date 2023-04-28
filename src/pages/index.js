import './index.css';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
//import {Popup} from './Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {initialCards, editButton, formProfile, nameInput, jobInput, addButton, formPlace, config} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';

//создание карточки
function createCard (item, cardTemplate) {
  const card = new Card(item, {handleCardClick: () => {imagePopup.open(item)}}, cardTemplate);
  const newCard = card.generateCard();
  return newCard;
};

const initialCardsList = new Section ( { initialCards, renderer: (item) => {
  const element = createCard (item, ('#card-template'));
  initialCardsList.addItem(element);
}}, ('.elements'));
initialCardsList.renderItems(initialCards);

//добавление попапов
const placePopup = new PopupWithForm (('.popup_type_place'), {handleFormSubmit: ( { place, link }) => {
  initialCardsList.addItem(createCard( { name: place, link: link }, ('#card-template')));
  placePopup.close();
}});
placePopup.setEventListeners();

const profilePopup = new PopupWithForm (('.popup_type_profile'), {handleFormSubmit: (data) => {
  profileInfo.setUserInfo(data);
  profilePopup.close();
}});
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage ('.popup_type_image');
imagePopup.setEventListeners();

const profileInfo = new UserInfo ( { userNameSelector: '.profile__name', userJobSelector: '.profile__job' });

//кнопка добавления карточки
addButton.addEventListener('click', () => {placePopup.open();});

//кнопка изменения профиля
editButton.addEventListener('click', () => {
  const userData = profileInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profilePopup.open();
});

//включение валидации форм

const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator( config, formPlace);
placeFormValidator.enableValidation();