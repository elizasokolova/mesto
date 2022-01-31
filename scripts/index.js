// Открытие и закрытие формы Popup
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__form');

// Присваивание имени и описания в форму
const popupName = document.getElementById('name');
const popupInfo = document.getElementById('info');
const profileAuthor = document.querySelector('.profile__author');
const profileStatus = document.querySelector('.profile__status');

// Открытие закрытие попап
function openPopup() {
  popupName.value = profileAuthor.textContent;
  popupInfo.value = profileStatus.textContent;
  popup.classList.add('popup_opened');
}
function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Редактирование имени и информации

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileAuthor.textContent = popupName.value;
    profileStatus.textContent = popupInfo.value;
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);