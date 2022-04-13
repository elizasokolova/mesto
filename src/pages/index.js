import FormValidator from '../components/FormValidator';
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
    popupEditProfile.renderLoading(true);
    api.updateCurrentUser(data).then(newUser => {
        userInfo.setUserInfo(newUser);
        popupEditProfile.close();
    })
        .catch(err => console.log(`Error: ${err}`))
        .finally(() => popupEditProfile.renderLoading(false));
});

// Открывает попап профиля, присваивая значения со страницы
popupEditButton.addEventListener('click', () => {
  popupEditProfile.setInputsValues(userInfo.getUserInfo());
  popupEditProfile.open();
});
popupEditProfile.setEventListeners();


// Добавление карточек в сетку
const sectionCards = new Section({
  renderer: (item, user) => {
      sectionCards.addItem(createCard(item, user));
  }
}, '.photo-grid');

// Попап подтверждения удаления карты
const popupDeleteCard = new PopupWithForm('#popup-delete-card', (data) => {
    api.deleteCard(data.id)
        .then(() => {
            data.element.remove();
            popupDeleteCard.close();
        }).catch(err => console.log(`Error: ${err}`))
});
popupDeleteCard.setEventListeners();

// Создает новую карту из объекта с данными
function createCard (item, user) {

  const card = new Card(
      {
        ...item,
        user,
      },
      '.cards-template',
      (name, link) => popupFullsize.open(name, link),
      (id, element) => popupDeleteCard.open({id, element}),
      (id) => (card.isLiked ? api.deleteLike(id) : api.addLike(id))
          .then((data) => card.setLikes(data.likes))
          .catch(err => console.log(`Error: ${err}`))
  );
  return card.createCard();
}
let user;

// Попап для добавления карточек
const popupAddCardOpen = document.querySelector('.profile__add-button');
const popupAddCard = new PopupWithForm('#popup-add', (data) => {
    popupAddCard.renderLoading(true);
    api.addNewCard({
        name: data.title,
        link: data.link,
    }).then(newCardData => {
        sectionCards.addItem(createCard(newCardData, user));
        popupAddCard.close();
    })
        .catch(err => console.log(`Error: ${err}`))
        .finally(() => popupAddCard.renderLoading(false));
});
// Открытие попапа добавления карты
popupAddCardOpen.addEventListener('click', () => popupAddCard.open());
popupAddCard.setEventListeners();

// Попап обновление аватарки профиля
const popupAvatarButton = document.querySelector('.profile__avatar-button');
const popupChangeAvatar = new PopupWithForm('#popup-change-avatar', (data) => {
    popupChangeAvatar.renderLoading(true);
    api.changeAvatar(data).then(avatar => {
        userInfo.setUserInfo(avatar);
        popupChangeAvatar.close();
    })
        .catch(err => console.log(`Error: ${err}`))
        .finally(() => popupChangeAvatar.renderLoading(false));
});
// Открытие попапа обновления аватарки
popupAvatarButton.addEventListener('click', () => popupChangeAvatar.open());
popupChangeAvatar.setEventListeners();

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

enableValidation(validationConfig, [popupEditProfile.form, popupAddCard.form, popupChangeAvatar.form]);

// Promise.all позволяет выполнить их одновременно,
// и даже в случае если одна из промис выдаст ошибку, ее поймает catch и тогда then у promise all выполнится,
// если catch бы не было, то все бы остановилось
Promise.all([
  api.getCurrentUser()
      .then(data => {
        userInfo.setUserInfo(data);

        user = data;

        return data;
      })
      .catch(err => console.log(`Error: ${err}`)),
  api.getInitialCards()
      .catch(err => console.log(`Error: ${err}`)),
]).then(([user, cards]) => {
  cards.reverse().forEach(card => sectionCards.renderer(card, user))
});