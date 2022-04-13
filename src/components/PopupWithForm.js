import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._formButton = this._popup.querySelector('.popup__save-button');
        this._inputs = {};
        this._data = {};
        this._form
            .querySelectorAll('.popup__edit-area')
            .forEach(input => this._inputs[input.name] = input);
    }

    get form () {
        return this._form;
    }

    setInputsValues (data) {
        Object.keys(data).forEach(key => this._inputs[key] && (this._inputs[key].value = data[key]));
    }

    _getInputValues () {
        return Object.values(this._inputs).reduce((data, input) => {
            data[input.name] = input.value;
            return data;
        }, {});
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit({
                ...this._data,
                ...this._getInputValues(),
            });
        });
    }

    close() {
        super.close();
        this._data = {};
        this._form.reset();
    }

    open(data = {}) {
        this._data = data;
        super.open();
        this._form.dispatchEvent(new Event('openForm'));
    }

    renderLoading (isLoading) {
        if (isLoading) {
            this._formButton.textContent = 'Сохранение...';
        }
        else {
            this._formButton.textContent = 'Сохранить';
        }
    }
}