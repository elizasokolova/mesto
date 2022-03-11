import {FormValidator} from './FormValidator.js';
import {initialCards} from './data.js';
import {Card} from './Card.js';
import {
  openPopup,
  closePopup,
} from './utils.js';

// Открытие и закрытие формы Popup
const popupEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup-profile');
const popupEditForm = popupEditProfile.querySelector('.popup__form');
const popups = document.querySelectorAll('.popup');

// Присваивание имени и описания в форму
const popupProfileName = document.getElementById('name');
const popupProfileInfo = document.getElementById('info');
const profileAuthor = document.querySelector('.profile__author');
const profileStatus = document.querySelector('.profile__status');

// Попап для добавления карточек
const popupAddCardOpen = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#popup-add');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');

const newCardLink = document.getElementById('link');
const newCardTitle = document.getElementById('title');

// Массив карточек выведение
const photoGrid = document.querySelector('.photo-grid');

popupEditButton.addEventListener('click', () => {  // Открывает попап профиля, присваивая значения со страницы
  openPopup(popupEditProfile);
  popupProfileName.value = profileAuthor.textContent;
  popupProfileInfo.value = profileStatus.textContent;
});

/** Редактирование имени и информации профиля */
function redactProfileInfo (event) {
    event.preventDefault();
    profileAuthor.textContent = popupProfileName.value;
    profileStatus.textContent = popupProfileInfo.value;
    closePopup(popupEditProfile);
}
popupEditForm.addEventListener('submit', redactProfileInfo); // Отправляет введенную инфу на страницу
///////////////////////////////////////////////////////
// Создание новой карты
popupAddCardOpen.addEventListener('click', () => {  // Открытие попапа добавления карты
  openPopup(popupAddCard);
});

popupAddCardForm.addEventListener('submit', (event) => {  // Создает карточку из формы добавления
  event.preventDefault(); 
// Создаем объект, который получает на вход введенные данные и передаем в функцию создания карты
  renderItem({
    name: newCardTitle.value,
    link: newCardLink.value,
  });
  closePopup(popupAddCard);
});

// Добавление карточки
function render(items) {   // Передаем сюда массив, forEach выполняет функцию для каждого элемента
  items.forEach(renderItem);
}

function renderItem (item) {  // Добавляем карточку в сетку, передавая значение от функции CreateCard
  const card = new Card(item, '.cards-template');
  photoGrid.prepend(card.createCard());
}

// Закрытие попап кликом на оверлей и крестик
popups.forEach( popup => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
})

render(initialCards); // Передаем массив

const validationConfig = {
  inputSelector: '.popup__edit-area',   // Поле ввода
  submitButtonSelector: '.popup__save-button',  // Кнопка сохранить
  inputErrorClass: 'popup__edit-area_invalid',  // Подчеркивание красным
  inactiveButtonClass: 'popup__save-button_invalid', // Блокировка кнопки Сохранить
  errorClass: 'popup__error_visible' // Видимость поля с ошибкой
};

const popupEditFormValidator = new FormValidator(validationConfig, popupEditForm);
popupEditFormValidator.enableValidation();

const popupAddCardFormValidator = new FormValidator(validationConfig, popupAddCardForm);
popupAddCardFormValidator.enableValidation();
