import Authorization from "./authorization.js";
import VisitService from "../services/visitService.js";
import ModalWindow from "../components/modalWindow.js";
import FormService from "../services/formService.js";
import {visitOptions} from "../constants/visitOptions.js";
import {inputClasses} from "../constants/input.js";

export default class Cabinet {
    constructor() {
        const loginBtn = document.getElementById('btnLogin');
        const createVisitBtn = document.getElementById('btnCreate');

        if (Authorization.isLogin()) {
            createVisitBtn.classList.toggle('d-none');

            this._showMainBlock();
        } else {
            loginBtn.classList.toggle('d-none');
        }

        loginBtn.addEventListener('click', () => this.login());
        createVisitBtn.addEventListener('click', () => this.createVisit());
    }

    login() {
        const modalWindow = new ModalWindow('Авторизация');
        const formEl = FormService.getLoginForm();
        const formElDom = formEl.getFormDOM();

        formElDom.addEventListener('focus', (event) => event.target.value = '', true);
        FormService.addListener(formElDom, 'reset', () => ModalWindow.closeWindow());

        FormService.addListener(formElDom, 'submit', async (event) => {
            event.preventDefault();

            try {
                const loginData = formEl.getData();
                await Authorization.login(loginData);
                ModalWindow.closeWindow();

                document.getElementById('btnLogin').classList.toggle('d-none');
                document.getElementById('btnCreate').classList.toggle('d-none');

                this._showMainBlock();
            } catch (error) {
                const errorMsgEl = formElDom.querySelector('small');
                if (errorMsgEl) errorMsgEl.outerHTML = '';
                const errorMsg = 'Неверный логин или пароль. Повторите ввод';
                formElDom.querySelector('.wrapper').insertAdjacentHTML('beforeend', `<small class="text-danger">${errorMsg}</small>`);
                console.error(error);
            }
        });

        modalWindow.addForm(formElDom);
        modalWindow.showWindow();
    }

    async createVisit() {
        try {
            const modalWindow = new ModalWindow('Создайте визит');
            const formEl = FormService.getVisitForm();
            const formElDom = formEl.getFormDOM();

            FormService.addListener(formElDom.querySelector('select[name="doctor"]'), 'change', event => {
                const target = event.target;
                const doctorCur = target.value;

                formEl.setAddFields(visitOptions.get(doctorCur).fields);
                formEl.reRenderAddFields();
            });

            FormService.addListener(formElDom, 'reset', () => ModalWindow.closeWindow());

            FormService.addListener(formElDom, 'submit', async (event) => {
                event.preventDefault();

                const visitData = formEl.getData();
                const visitNew = await VisitService.saveVisit(visitData);

                ModalWindow.closeWindow();
                VisitService.renderAllVisits();

            });

            modalWindow.addForm(formElDom);
            modalWindow.showWindow();

        } catch(error) {
            console.error(error);
        }
    }

    _showMainBlock() {
        document.querySelector('.main').style.display = 'block';

        const searchForm = FormService.getSearchForm();
        const searchFormEl = searchForm.getFormDOM();
        const wrapper = searchFormEl.querySelector('.wrapper');

        inputClasses.searchFormWrap.forEach(className => wrapper.classList.add(className));
        searchFormEl.querySelectorAll('.form-group').forEach(elem => elem.classList.add('col-md-3'));

        FormService.addListener(searchFormEl, 'submit', async (event) => {
            event.preventDefault();

            const searchData = searchForm.getData();
            await VisitService.filterVisits(searchData);

        });

        document.getElementById('searchFormBlock').append(searchFormEl);

        VisitService.renderAllVisits();
    }
}