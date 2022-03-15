/**
 * @class Card
 */
export class Card {
    /**
     * @constructor
     * @param {{name:string, link:string}} data
     * @param {string} templateSelector
     * @param {function(name:string, link:string)} handleCardClick
     */
    constructor (data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(templateSelector).content;
        this._handleCardClick = handleCardClick;
    }

    /**
     * Создает карточку для текущего объекта
     * @returns {HTMLElement}
     */
    createCard () {
        this._card = this._template.querySelector('.card').cloneNode(true);

        this._cardTitle = this._card.querySelector('.card__title');
        this._cardImage = this._card.querySelector('.card__image');
        this._deleteButton = this._card.querySelector('.card__delete-button');
        this._likeButton = this._card.querySelector('.card__like-button');

        this._cardImage.src = this._link;
        this._cardTitle.textContent = this._name;
        this._cardImage.alt = this._name;

        this._addListeners();

        return this._card;
    }

    _addListeners () {
        this._deleteButton.addEventListener('click', this._deleteCard);
        this._likeButton.addEventListener('click', this._likeCard);
        this._cardImage.addEventListener('click', this._openImage.bind(this));
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
      // this._likeButton.classList.toggle('card__like-button_active');
    }

    /**
     * Открытие полноразмерной карточки
     * @private
     */
    _openImage () {
      this._handleCardClick(this._name, this._link);
    }
}