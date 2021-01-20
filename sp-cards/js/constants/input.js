import {default as input} from "../components/form/input.js";
import {default as select} from "../components/form/select.js";
import {default as textarea} from "../components/form/textarea.js";

export const inputClasses = {
    searchFormWrap: ['form-row', 'd-flex', 'justify-content-center'],
    searchInputs: ['form-control', 'shadow-none'],
    searchInputsBlocks: ['form-group', 'col-md-3'],
    visitInputs: ['form-control', 'form-control-sm', 'shadow-none'],
    btnEnter: ['btn', 'btn-success', 'btn-sm'],
    btnCreate: ['btn', 'btn-success', 'btn-sm'],
    btnCancel: ['btn', 'btn-secondary', 'btn-cancel', 'btn-sm', 'ml-2'],
    btnSearch: ['btn', 'btn-search', 'btn-success', 'align-bottom'],
    btnsDiv: ['d-flex', 'justify-content-center', 'pt-3'],
    btnHidden: ['btn', 'd-none'],
    btnSave: ['btn', 'btn-success', 'btn-sm'],
    btnConfirm: ['btn', 'btn-confirm', 'btn-success', 'btn-sm'],
};

export const buttonsType = {
    btnEnter: {type: 'submit', classNames: inputClasses.btnEnter, isDismiss: false, text: 'Войти'},
    btnCreate: {type: 'submit', classNames: inputClasses.btnCreate, isDismiss: false, text: 'Создать'},
    btnSearch: {type: 'submit', classNames: inputClasses.btnSearch, isDismiss: false, text: 'Поиск'},
    btnCancel: {type: 'reset', classNames: inputClasses.btnCancel, isDismiss: true, text: 'Отмена'},
    btnHidden: {type:'button', classNames: inputClasses.btnHidden, isDismiss: false, text: 'Hidden'},
    btnSave: {type:'submit', classNames: inputClasses.btnSave, isDismiss: false, text: 'Сохранить'},
    btnConfirm: {type:'submit', classNames: inputClasses.btnConfirm, isDismiss: false, text: 'Подтвердить'}
};

export const inputObject = { input, select, textarea };