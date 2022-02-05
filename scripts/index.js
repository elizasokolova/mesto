const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Открытие и закрытие формы Popup
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup-profile');
const closeButton = popupEditProfile.querySelector('.popup__close-button');
const formElement = popupEditProfile.querySelector('.popup__form');

// Присваивание имени и описания в форму
const popupName = document.getElementById('name');
const popupInfo = document.getElementById('info');
const profileAuthor = document.querySelector('.profile__author');
const profileStatus = document.querySelector('.profile__status');

// Попап для добавления карточек
const popupAddCardOpen = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#popup-add');
const popupAddCardClose = popupAddCard.querySelector('.popup__close-button');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');

// Массив карточек выведение
const photoGrid = document.querySelector('.photo-grid');
const page = document.querySelector('.page');
const template = document.querySelector('.cards-template').content;

// Открытие полноразмерной карточки
const popupFullsize = document.querySelector('#popup-fullsize');
const popupFullImg = popupFullsize.querySelector('.popup__full-img');
const popupFullImgName = popupFullsize.querySelector('.popup__full-img-name');
const popupFullClose = popupFullsize.querySelector('.popup__close-button');

///////////////////////////////////////////////////
// Открытие закрытие попап
function openPopup(element) {
  element.classList.add('popup_opened');
}
function closePopup(element) {
  element.classList.remove('popup_opened');
}
////////////////////////////////////////////////////

editButton.addEventListener('click', () => {  // Открывает попап профиля, присваивая значения со страницы
  openPopup (popupEditProfile);
  popupName.value = profileAuthor.textContent;
  popupInfo.value = profileStatus.textContent;
});

closeButton.addEventListener('click', () => {  // Закрывает попап профиля
  closePopup (popupEditProfile);
});

/** Редактирование имени и информации профиля */
function formSubmitHandler (event) {
    event.preventDefault();
    profileAuthor.textContent = popupName.value;
    profileStatus.textContent = popupInfo.value;
    closePopup(popupEditProfile);
}
formElement.addEventListener('submit', formSubmitHandler); // Отправляет введенную инфу на страницу
///////////////////////////////////////////////////////
// Создание новой карты
popupAddCardOpen.addEventListener('click', () => {  // Открытие попапа добавления карты
  openPopup (popupAddCard);
});

/** Закрывает попап добавления по крестику */
function closeAddCardPopup() {
  popupAddCardForm.reset();
  closePopup (popupAddCard);
}
popupAddCardClose.addEventListener('click', closeAddCardPopup);

popupAddCardForm.addEventListener('submit', (event) => {  // Создает карточку из формы добавления
  event.preventDefault(); 
  const addCardLink = document.getElementById('link');
  const addCardTitle = document.getElementById('title');
// Создаем объект, который получает на вход введенные данные и передаем в функцию создания карты
  renderItem({
    name: addCardTitle.value,
    link: addCardLink.value,
  });

  closeAddCardPopup();
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

// Закрыть карточку
popupFullClose.addEventListener('click', () => {
  closePopup (popupFullsize);
});

render(initialCards); // Передаем массив