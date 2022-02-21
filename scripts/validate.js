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
    const button = form.querySelector(config.submitButtonSelector);
    toggleButtonState(button, form.checkValidity(), config);

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
    });

    const inputs = form.querySelectorAll(config.inputSelector);
    inputs.forEach(element => element.addEventListener('input', () => {
        toggleButtonState(button, form.checkValidity(), config);
        toggleInputState(form, element, config);
    }));
}

/**
 * Блокировка/разблокировка кнопки Сохранить 
 * @param {HTMLButtonElement} button 
 * @param {boolean} isEnabled 
 * @param {ValidationConfig} config 
 */
function toggleButtonState (button, isEnabled, config) {
    if (isEnabled) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    }
    else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}

/**
 * Меняет вид поля ввода по проверке валидности
 * @param {HTMLFormElement} form
 * @param {HTMLInputElement} input
 * @param {ValidationConfig} config
 */
function toggleInputState (form, input, config) {
    if (input.checkValidity()) {
        hideInputError(form, input, config);
    }
    else {
        showInputError(form, input, config);
    }
}

/**
 * Показывает браузерное сообщение об ошибке в нужное поле
 * @param {HTMLFormElement} form
 * @param {HTMLInputElement} input
 * @param {ValidationConfig} config
 */
function showInputError (form, input, config) {
    input.classList.add(config.inputErrorClass);
    const errorMessage = form.querySelector(`#popup__${input.id}-error`);
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(config.errorClass);
}

/**
 * Скрывает сообщение об ошибке
 * @param {HTMLFormElement} form
 * @param {HTMLInputElement} input
 * @param {ValidationConfig} config
 */
function hideInputError (form, input, config) {
    input.classList.remove(config.inputErrorClass);
    const errorMessage = form.querySelector(`#popup__${input.id}-error`);
    errorMessage.textContent = '';
    errorMessage.classList.remove(config.errorClass);
}

// Запускаем валидацию
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__edit-area',   // Поле ввода
    submitButtonSelector: '.popup__save-button',  // Кнопка сохранить
    inputErrorClass: 'popup__edit-area_invalid',  // Подчеркивание красным
    inactiveButtonClass: 'popup__save-button_invalid', // Блокировка кнопки Сохранить
    errorClass: 'popup__error_visible' // Видимость поля с ошибкой
});