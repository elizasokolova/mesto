// Открытие и закрытие формы Popup
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

// Присваивание имени и описания в форму
const popupName = document.getElementById('name');
const popupInfo = document.getElementById('info');
const profileAuthor = document.querySelector('.profile__author');
const profileStatus = document.querySelector('.profile__status');

function openPopup() {
  popup.classList.add('popup_opened');
  popupName.value = profileAuthor.textContent;
  popupInfo.value = profileStatus.textContent;
}
function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Редактирование имени и информации
const formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileAuthor.textContent = popupName.value;
    profileStatus.textContent = popupInfo.value;
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);