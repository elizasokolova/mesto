export default class Api {
    constructor ({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _validate (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    getCurrentUser() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then(this._validate);
    }

    updateCurrentUser(data) {
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._validate);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
            .then(this._validate);
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._validate);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`,{
            method: 'DELETE',
            headers: this._headers,
        }).then(this._validate);
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`,{
            method: 'PUT',
            headers: this._headers,
        }).then(this._validate);
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`,{
            method: 'DELETE',
            headers: this._headers,
        }).then(this._validate);
    }

    changeAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data['avatar'],
            })
        }).then(this._validate);
    }
}