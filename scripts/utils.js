// Открытие закрытие попап
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', pressedEscape);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', pressedEscape);
}

// Закрытие при нажатии Esc
function pressedEscape(event) {
    if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}