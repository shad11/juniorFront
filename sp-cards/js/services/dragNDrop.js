export default class DragNDrop{

    static cardDrag(){

        const container = document.querySelector('.cards-container');

        container.addEventListener('dragstart',this._dragStart);
        container.addEventListener('dragend', this._dragEnd);
        container.addEventListener('dragover', this._dragOver);


    }

    static _dragStart(event){
            event.target.closest('div.cardBlock').classList.add('selected-drag');
    }

    static _dragEnd(event){
        event.target.closest('div.cardBlock').classList.remove('selected-drag');
    }

    static _dragOver(event) {
       event.preventDefault();

        const container = document.querySelector('.cards-container');
        const activeEl = container.querySelector('.selected-drag');
        const currentEl = event.target;
        if (activeEl === currentEl || !currentEl.classList.contains('cardBlock')) {
            return;
        }

        const nextEl = currentEl === activeEl.nextElementSibling ? currentEl.nextElementSibling : currentEl;
        container.insertBefore(activeEl, nextEl);
    }














}