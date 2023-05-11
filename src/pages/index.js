import './index.css';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
import {Api} from '../components/Api.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
//import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {editButton, formProfile, nameInput, jobInput, addButton, formPlace, config, addAvatarButton, formAvatar} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '5bfaf0ab-f77d-40e6-a7ad-185983fcd4bc',
    'Content-Type': 'application/json'
  }
});

let userId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([user, cards]) => {
  userId = user._id;
  profileInfo.setUserInfo(user);
  profileInfo.setAvatar(user);
  initialCardsList.renderItems(cards);
})
.catch((err) => {alert(err)});

//создание карточки
function createCard (data, cardTemplate) {
  const card = new Card({ data, userId,
    handleCardClick: () => {imagePopup.open(data)},
    handleCardDelete: () => {
      confirmationPopup.open();
      confirmationPopup.handleSubmitConfirmation(() => {
        api.deleteCard(card._id)
        .then(() => {
          card.deleteCard();
          confirmationPopup.close();
        })
        .catch((err) => {
          alert(err);
        })
      }); 
    },
    handleCardLike: () => {
      if(card.isLiked()) {
        api.deleteLike(card._id)
        .then((data) => {
          card.deleteLike();
          card.setLikes(data.likes);
        })
        .catch((err) => {alert(err);})
      } else {
        api.addLike(card._id)
        .then((data) => {
          card.addLike();
          card.setLikes(data.likes);
        })
        .catch((err) => {alert(err);})
      }
    }
  }, ('#card-template'));
  const newCard = card.generateCard();
  return newCard;
};

//создание контейнера с карточками

const initialCardsList = new Section ( { items: [], renderer: (items) => {
  const element = createCard (items, ('#card-template'));
  initialCardsList.addItem(element);
}}, ('.elements'));

//добавление попапов
const placePopup = new PopupWithForm (('.popup_type_place'), {handleFormSubmit: (data) => {
  placePopup.renderLoading(true, 'Сохранение...');
  api.addCard(data)
  .then((data) => {
    const card = createCard(data, ('#card-template'));
    initialCardsList.addItem(card);
    placePopup.close();
  })
  .catch((err) => {
    alert(err);
  })
  .finally(() => {
    placePopup.renderLoading(false)
  })
}});
placePopup.setEventListeners();

const profilePopup = new PopupWithForm (('.popup_type_profile'), {handleFormSubmit: (data) => {
  profilePopup.renderLoading(true, 'Сохранение...');
  api.editUserInfo(data)
  .then((res) => {
    profileInfo.setUserInfo(res);
    profilePopup.close();
  })
  .catch((err) => {alert(err);})
  .finally(() => {profilePopup.renderLoading(false);})

}});
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage ('.popup_type_image');
imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm(('.popup_type_avatar'), {handleFormSubmit: (data) => {
  avatarPopup.renderLoading(true, 'Сохранение...');
  api.editAvatar(data)
  .then((res) => {
    profileInfo.setAvatar(res);
    avatarPopup.close();
  })
  .catch((err) => {alert(err)})
  .finally(() => {avatarPopup.renderLoading(false)})
}});
avatarPopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation (('.popup_type_confirmation'), {
  handleSubmit: (data) => {
    api.deleteCard(data)
    .then(() => {confirmationPopup.close();})
    .catch((err) => {alert(err)})
  }
})
confirmationPopup.setEventListeners();

const profileInfo = new UserInfo ( { userNameSelector: '.profile__name', userJobSelector: '.profile__job', userAvatarSelector: '.profile__avatar' });

//кнопка добавления карточки
addButton.addEventListener('click', () => {placePopup.open();});

//кнопка изменения профиля
editButton.addEventListener('click', () => {
  const userData = profileInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profilePopup.open();
});

//кнопка изменения аватара
addAvatarButton.addEventListener('click', () => {avatarPopup.open()});

//включение валидации форм
const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator( config, formPlace);
placeFormValidator.enableValidation();

const avatarFormValidator = new FormValidator( config, formAvatar);
avatarFormValidator.enableValidation();