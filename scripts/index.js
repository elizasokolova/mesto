// Открытие и закрытие формы Popup
const popupEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup-profile');
const popupEditForm = popupEditProfile.querySelector('.popup__form');
const popups = document.querySelectorAll('.popup');

// Присваивание имени и описания в форму
const popupProfileName = document.getElementById('name');
const popupProfileInfo = document.getElementById('info');
const profileAuthor = document.querySelector('.profile__author');
const profileStatus = document.querySelector('.profile__status');

// Попап для добавления карточек
const popupAddCardOpen = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#popup-add');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');

const newCardLink = document.getElementById('link');
const newCardTitle = document.getElementById('title');

// Массив карточек выведение
const photoGrid = document.querySelector('.photo-grid');
const page = document.querySelector('.page');
const template = document.querySelector('.cards-template').content;

// Открытие полноразмерной карточки
const popupFullsize = document.querySelector('#popup-fullsize');
const popupFullImg = popupFullsize.querySelector('.popup__full-img');
const popupFullImgName = popupFullsize.querySelector('.popup__full-img-name');

///////////////////////////////////////////////////
// Открытие закрытие попап
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', pressedEscape);
}
function closePopup(element) {
  element.classList.remove('popup_opened');
  document.addEventListener('keydown', pressedEscape);
}

// Закрытие при нажатии Esc
function pressedEscape(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};
////////////////////////////////////////////////////

popupEditButton.addEventListener('click', () => {  // Открывает попап профиля, присваивая значения со страницы
  openPopup (popupEditProfile);
  popupProfileName.value = profileAuthor.textContent;
  popupProfileInfo.value = profileStatus.textContent;
});

/** Редактирование имени и информации профиля */
function redactProfileInfo (event) {
    event.preventDefault();
    profileAuthor.textContent = popupProfileName.value;
    profileStatus.textContent = popupProfileInfo.value;
    closePopup(popupEditProfile);
}
popupEditForm.addEventListener('submit', redactProfileInfo); // Отправляет введенную инфу на страницу
///////////////////////////////////////////////////////
// Создание новой карты
popupAddCardOpen.addEventListener('click', () => {  // Открытие попапа добавления карты
  openPopup (popupAddCard);
});


popupAddCardForm.addEventListener('submit', (event) => {  // Создает карточку из формы добавления
  event.preventDefault(); 
// Создаем объект, который получает на вход введенные данные и передаем в функцию создания карты
  renderItem({
    name: newCardTitle.value,
    link: newCardLink.value,
  });

  popupAddCardForm.reset();
  closePopup (popupAddCard);
});


// Добавление карточки
function render(item) {   // Передаем сюда массив, forEach выполняет функцию для каждого элемента
  item.forEach(renderItem);
}

function renderItem(item) {  // Добавляем карточку в сетку, передавая значение от функции CreateCard
  const addCard = createCard(item);
  photoGrid.prepend(addCard);
}

/** Создает карту из массива */
function createCard(item) { 

  const card = template.querySelector('.card').cloneNode(true); // Склонирует все элементы массива

  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');

  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;

  addListeners(card);
  
  return card; //Возвращаем в функцию RenderItem
}

function addListeners(card) {
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const cardImage = card.querySelector('.card__image');

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', openImage);
}

function openImage(event) {  // Открывает карточку, присваивая ей значения полученного при нажатии элемента
    popupFullImg.src = event.target.src;
    popupFullImg.alt = event.target.alt;
    popupFullImgName.textContent = event.target.alt;
    openPopup (popupFullsize);
}

function deleteCard(event) {
  event.target.closest('.card').remove();  // Удаляет ближайший элемент с таким классом
}

function likeCard(event) {
  event.target.classList.toggle('card__like-button_active'); // Добавляет/удаляет класс Лайк
}

// Закрытие попап кликом на оверлей и крестик
popups.forEach( popup => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
})

render(initialCards); // Передаем массив