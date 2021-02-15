export default class ActiveTD {
    #userClick = false;
    #id;

    constructor(id) {
        this.#id = id;

        const elemTd = document.querySelector(`#td-${id}`);

        elemTd.addEventListener('click', this.#userClickEvent);
        elemTd.style.backgroundColor = 'blue';
    }

    get id() {
        return this.#id;
    }

    get userClick() {
        return this.#userClick;
    }

    removeClickEvent() {
        const elemTd = document.querySelector(`#td-${this.#id}`);

        elemTd.removeEventListener('click', this.#userClickEvent, false);

        if (!this._userClick) {
            elemTd.style.backgroundColor = '#F08080';
        }
    }

    #userClickEvent = event => {
        const elemTd = event.target;

        this._userClick = true;
        elemTd.style.backgroundColor = 'green';
    }
}