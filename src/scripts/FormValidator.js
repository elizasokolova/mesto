/**
 * @typedef ValidationConfig
 * @property {string} inputSelector
 * @property {string} submitButtonSelector
 * @property {string} inputErrorClass
 * @property {string} inactiveButtonClass
 * @property {string} errorClass
 */

/**
 * @class FormValidator
 */
export default class FormValidator {
    /**
     * @constructor
     * @param {ValidationConfig} config 
     * @param {HTMLFormElement} form 
     */
    constructor (config, form) {
        /**
         * @type {ValidationConfig}
         * @private
         */
        this._config = config;
        /**
         * @type {HTMLFormElement}
         * @private
         */
        this._form = form;
        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._button = this._form.querySelector(this._config.submitButtonSelector);
        /**
         * @type {NodeListOf<HTMLInputElement>}
         */
        this._inputs = this._form.querySelectorAll(this._config.inputSelector);
    }

    /**
     * Включает проверку валидации формы
     */
    enableValidation () {
        this._toggleButtonState(this._form.checkValidity());
        this._addOpenFormListener();
        this._inputs.forEach(element => this._addInputListener(element));
    }

    /**
     * Блокировка/разблокировка кнопки Сохранить 
     * @param {boolean} isEnabled 
     * @private
     */
    _toggleButtonState (isEnabled) {
        if (isEnabled) {
            this._button.classList.remove(this._config.inactiveButtonClass);
            this._button.disabled = false;
        }
        else {
            this._button.classList.add(this._config.inactiveButtonClass);
            this._button.disabled = true;
        }
    }

    /**
     * Добавляет обработчик на событие открытия формы
     * @private
     */
    _addOpenFormListener () {
        this._form.addEventListener('openForm', () => {
            this._inputs.forEach(input => this._hideInputError(input));
            this._toggleButtonState(this._form.checkValidity());
        });
    }

    /**
     * Добавляет обработчик на событие 'input'
     * @param {HTMLInputElement} input
     * @private
     */
    _addInputListener (input) {
        input.addEventListener('input', () => {
            this._toggleButtonState(this._form.checkValidity());
            this._toggleInputState(input);
        });
    }

    /**
     * Меняет вид поля ввода по проверке валидности
     * @param {HTMLInputElement} input
     * @private
     */
    _toggleInputState (input) {
        if (input.checkValidity()) {
            this._hideInputError(input);
        }
        else {
            this._showInputError(input);
        }
    }

    /**
     * Скрывает сообщение об ошибке
     * @param {HTMLInputElement} input
     * @private
     */
    _hideInputError (input) {
        input.classList.remove(this._config.inputErrorClass);
        const errorMessage = this._form.querySelector(`#popup__${input.id}-error`);
        errorMessage.textContent = '';
        errorMessage.classList.remove(this._config.errorClass);
    }

    /**
     * Показывает браузерное сообщение об ошибке в нужное поле
     * @param {HTMLInputElement} input
     * @private
     */
    _showInputError (input) {
        input.classList.add(this._config.inputErrorClass);
        const errorMessage = this._form.querySelector(`#popup__${input.id}-error`);
        errorMessage.textContent = input.validationMessage;
        errorMessage.classList.add(this._config.errorClass);
    }
}