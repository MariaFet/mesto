let editButton = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button_type_close');
editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});
closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};
formElement.addEventListener('submit', handleFormSubmit);
let submitButton = formElement.querySelector('.popup__button_type_submit');
submitButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});