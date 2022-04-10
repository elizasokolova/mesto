export default class Section {
    constructor( {renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    get renderer () {
        return this._renderer;
    }

    addItem(element) {
        this._container.prepend(element);
    }
}