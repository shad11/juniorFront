import VisitService from "../../services/visitService.js";
import ModalWindow from "../../components/modalWindow.js";
import FormService from "../../services/formService.js";
import DragNDrop from "../../services/dragNDrop.js";


export default class VisitDOMListeners {
    static renderClasses = Object.freeze({
        CARD_BLOCK_CLASS: 'cardBlock',
        MORE_BTN_CLASS: 'more-btn',
        MENU_BTN_CLASS: 'menu-btn',
        MORE_BLOCK_CLASS: 'show-more',
        MENU_BLOCK_CLASS: 'menu-visit',
        MENU_BLOCK_ICON_CLASS: 'fa-ellipsis-v',
        MENU_BLOCK_EDIT_BTN_CLASS: 'edit-btn',
        MENU_BLOCK_DELETE_BTN_CLASS: 'delete-btn',
        CLOSE_BTN_CLASS: 'close-span',
    });

    static addListeners(elementDOM) {
        elementDOM.querySelector(`.${this.renderClasses.MORE_BTN_CLASS}`)
            .addEventListener('click', this._showMore);

        elementDOM.querySelector(`.${this.renderClasses.MENU_BTN_CLASS}`)
            .addEventListener('click', this._showMenu);

        elementDOM.querySelector(`.${this.renderClasses.MENU_BLOCK_EDIT_BTN_CLASS}`)
            .addEventListener('click',this._editVisit);

        elementDOM.querySelector(`.${this.renderClasses.MENU_BLOCK_DELETE_BTN_CLASS}`)
            .addEventListener('click', this._deleteVisit);

        elementDOM.querySelector(`.${this.renderClasses.CLOSE_BTN_CLASS}`)
            .addEventListener('click', this._deleteVisit);

        elementDOM.addEventListener('click', DragNDrop.cardDrag());


    }



   static _closestElem(elem, closestElemClass){
        return elem.closest(closestElemClass);
    }

    static _showMore(event) {
        const elem = event.target;
        const cardEl = VisitDOMListeners._closestElem(elem, `div.${VisitDOMListeners
                                                                                     .renderClasses.CARD_BLOCK_CLASS}`);
        const moreEl = cardEl.querySelector(`.${VisitDOMListeners.renderClasses.MORE_BLOCK_CLASS}`);
        elem.innerHTML === "Показать больше" ?  elem.innerHTML = "Скрыть" : elem.innerHTML = "Показать больше";
            moreEl.classList.toggle('d-none');
    }

    static _showMenu(event) {
        const elem = event.target;

        const cardsContainer = VisitDOMListeners._closestElem(elem, '.cards-container');

        VisitDOMListeners._closePrevMenu(cardsContainer,elem);

        const cardEl = VisitDOMListeners._closestElem(elem, 'div.cardBlock');
        const menuBtn = cardEl.querySelector(`.${VisitDOMListeners.renderClasses.MENU_BTN_CLASS}`);
        const menuIcon = cardEl.querySelector(`.${VisitDOMListeners.renderClasses.MENU_BLOCK_ICON_CLASS}`);
        const menuEl = cardEl.querySelector(`.${VisitDOMListeners.renderClasses.MENU_BLOCK_CLASS}`);

        if (elem === menuIcon){
            menuEl.classList.toggle('d-none');
            VisitDOMListeners._hideMenu([menuEl, menuBtn, menuIcon]);
            return;
        }
        menuEl.classList.toggle('d-none');

        VisitDOMListeners._hideMenu([menuEl,menuBtn,menuIcon]);
    }




    static _hideMenu([hiddenElement, ...exceptElements]) {
        if(!hiddenElement.classList.contains('d-none')){}
        window.onclick = event => {
           if (event.target !== hiddenElement && exceptElements.every(element => event.target !== element)) {

              hiddenElement.classList.add('d-none');
            }
        }
    }

    static _closeBtnMenu(cardEl){
        const menuBlock = cardEl.querySelector(`.${VisitDOMListeners.renderClasses.MENU_BLOCK_CLASS}`);
        if(menuBlock) {
            menuBlock.classList.add('d-none');
        }
    }

   static _closePrevMenu(elementsList, currentEl){
       elementsList.querySelectorAll(`.${VisitDOMListeners.renderClasses.MENU_BLOCK_CLASS}`)
           .forEach(btn => {


               if (VisitDOMListeners._closestElem(currentEl, '.button-wrapper')
                                                                               .nextElementSibling !== btn) {
                   btn.classList.add('d-none');
               }
           });

   }



    static async _editVisit(event) {
        try {
            const elem = event.target;
            const cardEl = VisitDOMListeners._closestElem(elem, `div.${VisitDOMListeners
                                                                                     .renderClasses.CARD_BLOCK_CLASS}`);
            VisitDOMListeners._closeBtnMenu(cardEl);
            const cardId = cardEl.dataset.cardId;
             await VisitService.openEditForm(cardId);

        }catch(error){
                alert(error);
                console.error(error);
            }

    }


    static _deleteVisit(event) {
        const elem = event.target;
        const cardEl = VisitDOMListeners._closestElem(elem, 'div.cardBlock');
        VisitDOMListeners._closeBtnMenu(cardEl);
        const cardId = cardEl.dataset.cardId;
        const modalWindow = new ModalWindow();
        const formEl = FormService.getPasswordForm();
        const formElDom = formEl.getFormDOM();
        modalWindow.addForm(formElDom);
        modalWindow.showWindow();

        formElDom.addEventListener('focus', (event) => event.target.value = '', true);
        FormService.addListener(formElDom, 'submit', async (event) => {
            event.preventDefault();
            const password = document.getElementById('passFormPassword').value;
            try {
                await VisitService.delete(cardId, password);
                VisitDOMListeners._removeVisitCard(cardEl);
                ModalWindow.closeWindow();
            } catch (error) {
                const errorMsgEl = formElDom.querySelector('small');
                if (errorMsgEl) errorMsgEl.outerHTML = '';
                const errorMsg = 'Неверный пароль. Повторите ввод';
                formElDom.querySelector('.wrapper').insertAdjacentHTML('beforeend', `<small class="text-danger">${errorMsg}</small>`);
                console.error(error);
            }
        });
    }


    static _removeVisitCard(card){
        const container = document.querySelector('.cards-container');
        container.removeChild(card);
        if(container.innerHTML === ''){
            container.innerHTML = `<p class="ml-5 mt-4">Ни одного визита не было добавлено</p>`;
        }
    }

}



