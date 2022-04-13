export const validationConfig = {
    inputSelector: '.popup__edit-area',   // Поле ввода
    submitButtonSelector: '.popup__save-button',  // Кнопка сохранить
    inputErrorClass: 'popup__edit-area_invalid',  // Подчеркивание красным
    inactiveButtonClass: 'popup__save-button_invalid', // Блокировка кнопки Сохранить
    errorClass: 'popup__error_visible' // Видимость поля с ошибкой
};
export const formValidators = {};

export const popupEditButton = document.querySelector('.profile__edit-button');
export const popupAddCardOpen = document.querySelector('.profile__add-button');
export const popupAvatarButton = document.querySelector('.profile__avatar-button');



