import FormValidator from '../components/FormValidator.js';
import initialCards from '../components/data.js';
import Card from '../components/Card.js';
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

import './index.css';

// Объект для получения/изменения инфы о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__author', // Задаем селекторы для элементов с именем/инфы пользователя
  infoSelector: '.profile__status',
});

// Попап "изменения данных о пользователе"
const popupEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = new PopupWithForm('#popup-profile', (data) => {
  userInfo.setUserInfo(data);
  popupEditProfile.close();
});

// Открывает попап профиля, присваивая значения со страницы
popupEditButton.addEventListener('click', () => {
  popupEditProfile.setInputsValues(userInfo.getUserInfo());
  popupEditProfile.open();
});
popupEditProfile.setEventListeners();


// Добавление карточек в сетку
const sectionCards = new Section({
  items: initialCards,
  renderer: (item) => {
      sectionCards.addItem(createCard(item));
  }
}, '.photo-grid');

sectionCards.renderItems();

// Создает новую карту из объекта с данными
function createCard (item) {
  const card = new Card(
      item,
      '.cards-template',
      (name, link) => popupFullsize.open(name, link)
  );
  return card.createCard();
}

// Попап для добавления карточек
const popupAddCardOpen = document.querySelector('.profile__add-button');
const popupAddCard = new PopupWithForm('#popup-add', (data) => {
  sectionCards.addItem(createCard({
    name: data.title,
    link: data.link,
  }));
  popupAddCard.close();
});

// Открытие попапа добавления карты
popupAddCardOpen.addEventListener('click', () => popupAddCard.open());
popupAddCard.setEventListeners();

// Массив карточек выведение
const popupFullsize = new PopupWithImage('#popup-fullsize');
popupFullsize.setEventListeners();

const validationConfig = {
  inputSelector: '.popup__edit-area',   // Поле ввода
  submitButtonSelector: '.popup__save-button',  // Кнопка сохранить
  inputErrorClass: 'popup__edit-area_invalid',  // Подчеркивание красным
  inactiveButtonClass: 'popup__save-button_invalid', // Блокировка кнопки Сохранить
  errorClass: 'popup__error_visible' // Видимость поля с ошибкой
};

const formValidators = {};

function enableValidation (config, forms) {
  forms.forEach(form => {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
  })
}

enableValidation(validationConfig, [popupEditProfile.form, popupAddCard.form]);