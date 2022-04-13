/**
 * @class Card
 */
export default class Card {
    /**
     * @constructor
     * @param {Object} data
     * @param {string} templateSelector
     * @param {function(name:string, link:string)} handleCardClick
     * @param {function(id:string, element: HTMLElement)} handleCardDelete
     * @param {function(id:string)} handleCardLike
     */
    constructor (
        data,
        templateSelector,
        handleCardClick,
        handleCardDelete,
        handleCardLike,
    ) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._userId = data.user._id;
        this._ownerId = data.owner._id;
        this._template = document.querySelector(templateSelector).content;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this.isLiked = false;
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
        this._sumLike = this._card.querySelector('.card__sum-like');

        this._cardImage.src = this._link;
        this._cardTitle.textContent = this._name;
        this._cardImage.alt = this._name;
        this.setLikes(this._likes);

        if (this._userId !== this._ownerId) {
            this._deleteButton.style.display = 'none';
        }

        this._addListeners();

        return this._card;
    }

    _addListeners () {
        this._deleteButton.addEventListener('click', this._deleteCard.bind(this));
        this._likeButton.addEventListener('click', this._likeCard.bind(this));
        this._cardImage.addEventListener('click', this._openImage.bind(this));
        this._cardImage.addEventListener('error', this._onErrorLoadImage.bind(this));
    }

    /**
     * Удаляет ближайший элемент с таким классом
     * @private
     */
    _deleteCard () {
        this._handleCardDelete(this._cardId, this._card);
    }

    /**
     * Добавляет/удаляет класс Лайк
     * @private
     */
    _likeCard () {
        this._handleCardLike(this._cardId);
    }

    /**
     * Устанавливает количество лайков для карточки
     * @param {Array} likes
     * @public
     */
    setLikes (likes) {
        this._sumLike.textContent = likes.length;

        this.isLiked = likes.some((like) => like._id === this._userId);

        if (this.isLiked) {
            this._likeButton.classList.add('card__like-button_active');
        }
        else {
            this._likeButton.classList.remove('card__like-button_active');
        }
    }

    /**
     * Открытие полноразмерной карточки
     * @private
     */
    _openImage () {
      this._handleCardClick(this._name, this._link);
    }

    /**
     * Вставка заглушки при невалидной ссылке
     * @param {Event} event
     * @private
     */
    _onErrorLoadImage (event) {
        event.preventDefault();
        this._cardImage.src = this._cardImage.dataset['defaultSrc'];
    }
}