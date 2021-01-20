export default class ModalWindow {
    constructor(modalTitle = '') {
        this.title = modalTitle;
        this.id = `modal${Math.random() * 100}`;
        this.modalElement = this._createWindow();
        this.modalElement.querySelector('.close-span').addEventListener('click', ModalWindow.closeWindow);
    }

    _createWindow() {
        const modalEl = document.createElement('div');
        modalEl.classList.add('modal');
        modalEl.id = this.id;
        modalEl.innerHTML = `<div class="modal-content">${this._renderHeader()}</div>`;

        return modalEl;
    }

    _renderHeader(){
        return `<div class="modal-header p-0">
           <h5>${this.title}</h5>
           <span class="close-span btn btn-outline-success">&#10008;</span>
           </div>`;
    }

    _hideWindow(){
        const modal = this.modalWindow;
        if (modal){
            window.onclick = function(event) {
                if (event.target === modal) {
                    const pageBody =  document.querySelector('.container-fluid');
                    pageBody.removeChild(modal);
                }
            }
        }
    }

    static closeWindow() {
        const modal = document.querySelector('.modal');
        if(modal) {
            const pageBody =  document.querySelector('.container-fluid');
            pageBody.removeChild(modal);
        }
    }
    
    get modalWindow(){
        return document.getElementById(this.id);
    }

    get modalBody(){
        return this.modalElement.querySelector('.modal-content');
    }

    showWindow(){
       const modal = this.modalWindow;
       const pageBody =  document.querySelector('.container-fluid');
       pageBody.insertAdjacentElement('afterbegin', this.modalElement);
       this._hideWindow();
    }

    addForm(currentForm){
        const modalContent = this.modalBody;
        modalContent.insertAdjacentElement('beforeend', currentForm);
    }
}








