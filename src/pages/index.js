import FormValidator from '../components/FormValidator';
import initialCards from '../components/data';
import Card from '../components/Card';
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import Section from "../components/Section";
import Api from "../components/Api";

import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '6a5a6e79-9da9-4935-9ee4-fe9aaaefe451',
    'Content-Type': 'application/json'
  }
});

window.api = api;

// Объект для получения/изменения инфы о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__author', // Задаем селекторы для элементов с именем/инфы пользователя
  infoSelector: '.profile__status',
  avatarSelector: '.profile__avatar',
});

// Попап "изменения данных о пользователе"
const popupEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = new PopupWithForm('#popup-profile', (data) => {
  api.updateCurrentUser(data).then(newUser => {
    userInfo.setUserInfo(newUser);
    popupEditProfile.close();
  })
});

// Открывает попап профиля, присваивая значения со страницы
popupEditButton.addEventListener('click', () => {
  popupEditProfile.setInputsValues(userInfo.getUserInfo());
  popupEditProfile.open();
});
popupEditProfile.setEventListeners();


// Добавление карточек в сетку
const sectionCards = new Section({
  renderer: (item) => {
      sectionCards.addItem(createCard(item));
  }
}, '.photo-grid');
api.getInitialCards().then(cards => cards.forEach(card => sectionCards.renderer(card)));

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

// Запросы на сервер
api.getCurrentUser()
    .then(data => userInfo.setUserInfo(data))
    .catch(error => console.log(error))