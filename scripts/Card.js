import {openPopup} from './utils.js';

/**
 * @class Card
 */
export class Card {
    /**
     * @constructor
     * @param {{name:string, link:string}} data
     * @param {string} templateSelector
     */
    constructor (data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(templateSelector).content;
    }

    /**
     * Создает карточку для текущего объекта
     * @returns {HTMLElement}
     */
    createCard () {
        const card = this._template.querySelector('.card').cloneNode(true);

        const cardTitle = card.querySelector('.card__title');
        const cardImage = card.querySelector('.card__image');

        cardImage.src = this._link;
        cardTitle.textContent = this._name;
        cardImage.alt = this._name;

        this._addListeners(card);

        return card;
    }

    /**
     * @param {HTMLElement} card
     * @private
     */
    _addListeners (card) {
        const deleteButton = card.querySelector('.card__delete-button');
        const likeButton = card.querySelector('.card__like-button');
        const cardImage = card.querySelector('.card__image');

        deleteButton.addEventListener('click', this._deleteCard);
        likeButton.addEventListener('click', this._likeCard);
        cardImage.addEventListener('click', this._openImage);
    }

    /**
     * Удаляет ближайший элемент с таким классом
     * @param {Event} event
     * @private
     */
    _deleteCard (event) {
        event.target.closest('.card').remove();
    }

    /**
     * Добавляет/удаляет класс Лайк
     * @param {Event} event
     * @private
     */
    _likeCard (event) {
        event.target.classList.toggle('card__like-button_active');
    }

    /**
     * Открытие полноразмерной карточки
     * @param {Event} event
     * @private
     */
    _openImage (event) {
        const popupFullsize = document.querySelector('#popup-fullsize');
        const popupFullImg = popupFullsize.querySelector('.popup__full-img');
        const popupFullImgName = popupFullsize.querySelector('.popup__full-img-name');

        popupFullImg.src = event.target.src;
        popupFullImg.alt = event.target.alt;
        popupFullImgName.textContent = event.target.alt;
        openPopup(popupFullsize);
    }
}