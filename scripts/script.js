let editButton = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');
function openPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
};
function closePopup () {
  popup.classList.remove('popup_opened');
};
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};
formElement.addEventListener('submit', handleFormSubmit);