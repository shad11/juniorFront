import Form from "../components/form/form.js";
import { inputClasses, buttonsType } from "../constants/input.js";
import { doctors, urgencyOptions, statusOptions, visitBase, visitOptions } from "../constants/visitOptions.js";

export default class FormService {
    static getLoginForm() {
        const mainFormFields = [{
            elementType: 'input',
            label: 'Эл. адрес',
            name: 'email',
            classNames: inputClasses.visitInputs,
            id: 'email',
            required: true,
            placeholder: 'test@gmail.com'
        },
        {
            elementType: 'input',
            label: 'Пароль',
            name: 'password',
            type: 'password',
            classNames: inputClasses.visitInputs,
            id: 'password',
            required: true
        }];

        const btns = [buttonsType.btnEnter, buttonsType.btnCancel];

        return new Form("loginForm", mainFormFields, [], btns);
    }

    static  getPasswordForm() {
        const mainFormFields = [{
                elementType: 'input',
                label: 'Пароль',
                name: 'password',
                type: 'password',
                classNames: inputClasses.visitInputs,
                id: 'passFormPassword',
                required: true
            }];

        const btn = [buttonsType.btnConfirm];

        return new Form("loginForm", mainFormFields, [], btn);
    }

    static getVisitForm(doctorName, editForm) {
        const mainFormFields = [{
            elementType: 'select',
            label: 'Выберите доктора',
            name: 'doctor',
            options: doctors,
            classNames: inputClasses.visitInputs,
            id: 'selectDoctor',
        }, ...visitBase.fields];

        const addFormFields = visitOptions.get(doctorName || Object.keys(doctors)[0]).fields;

        const btns = [editForm ? buttonsType.btnSave : buttonsType.btnCreate, buttonsType.btnCancel];

        return new Form('visitForm', mainFormFields, addFormFields, btns);
    }

    static getSearchForm() {
        const mainFormFields = [{
            elementType: 'input',
            label: 'Содержимое визита',
            name: 'searchTitle',
            classNames: inputClasses.searchInputs,
            type: 'text',
            id: 'searchTitle',
            placeholder: 'Введите имя'
        },
        {
            elementType: 'select',
            label: 'Статус визита',
            name: 'searchStatus',
            type: 'text',
            classNames: inputClasses.searchInputs,
            options: {'': 'все', ...statusOptions},
            id: 'searchStatus'
        },
        {
            elementType: 'select',
            label: 'Срочность визита',
            name: 'searchUrgency',
            classNames: inputClasses.searchInputs,
            type: 'text',
            options: {'': 'не задано', ...urgencyOptions},
            id: 'searchUrgency'
        }];

        const btn = [buttonsType.btnSearch];

        return new Form('searchForm', mainFormFields, [], btn);
    }

    static addListener(formEl, event, callback) {
        formEl.addEventListener(event, callback);
    }
}