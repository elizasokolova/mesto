/**
 * @typedef ValidationConfig
 * @property {string} formSelector
 * @property {string} inputSelector
 * @property {string} submitButtonSelector
 * @property {string} inputErrorClass
 * @property {string} inactiveButtonClass
 */

/**
 * Перебирает все формы и включает проверку валидации
 * @param {ValidationConfig} config 
 */
function enableValidation (config) {
    document.querySelectorAll(config.formSelector)
        .forEach(element => enableFormValidation(element, config)); 
}

/**
 * Включает проверку валидации формы
 * @param {HTMLFormElement} form 
 * @param {ValidationConfig} config 
 */
function enableFormValidation (form, config) {
    //formElement.checkValidity()
    
}

/**
 * Блокировка/разблокировка кнопки Сохранить 
 * @param {HTMLButtonElement} button 
 * @param {boolean} isEnabled 
 * @param {ValidationConfig} config 
 */
function toggleButtonState (button, isEnabled, config) {
    if (isEnabled) {
        button.disabled = false;
        button.classList.remove(config.inactiveButtonClass);
    }
    else {
        button.disabled = true;
        button.classList.add(config.inactiveButtonClass);
    }
}







// Запускаем валидацию
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__edit-area',   // Поле ввода
    submitButtonSelector: '.popup__save-button',  // Кнопка сохранить
    inputErrorClass: 'popup__edit-area_invalid',  // Подчеркивание красным
    inactiveButtonClass: 'popup__save-button_invalid', // Блокировка кнопки Сохранить
});