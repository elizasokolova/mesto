// Открытие закрытие попап
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', pressedEscape);

    // Если в попапе есть форма, то создать событие
    const form = popup.querySelector('.popup__form');
    form && form.dispatchEvent(new Event('openForm'));
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');

    const form = popup.querySelector('.popup__form');
    form && form.reset();

    document.removeEventListener('keydown', pressedEscape);
}

// Закрытие при нажатии Esc
function pressedEscape(event) {
    if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}