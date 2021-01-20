import Request from "./request.js";
import { API, RESOURCES } from "../constants/api.js";
import {statusOptions, urgencyOptions, visitClasses, visitOptions} from "../constants/visitOptions.js";
import VisitDOMListeners from "../entities/visit/visitDOMListeners.js";
import Authorization from "../entities/authorization.js";
import FormService from "./formService.js";
import ModalWindow from "../components/modalWindow.js";

export default class VisitService {
    static async renderAllVisits() {
        const allVisits = await this.getVisits();

       this._renderVisits(allVisits);
    }

    static async filterVisits({searchTitle = '', searchStatus = '', searchUrgency = ''}) {
        const text = !searchTitle ? '' : searchTitle.trim();

        const allVisits = await this.getVisits();
        const today = new Date();
        const todayMS = today.getTime() - (today.getTime() % 86400000);

        const visits = allVisits.filter(({urgency, dateVisit, goal, fullName, description}) => {
            const date = new Date(dateVisit);
            const elemText = [goal, fullName, description].join(' ');

            return elemText.toLowerCase().includes(text.toLowerCase())
                && (!searchUrgency || urgency === searchUrgency)
                && (isNaN(date.getTime())
                    || !searchStatus
                    || (searchStatus === 'closed' && date.getTime() < todayMS || searchStatus === 'open' && date.getTime() >= todayMS)
                );
        });

        this._renderVisits(visits);
    }

    static async openEditForm(visitId) {
        if (!Authorization.isLogin()) {
            return;
        }

        const visitData = await this.getVisit(visitId);

        if (Object.keys(visitData).length === 0) {
            return;
        }

        const modal = new ModalWindow('Редактируйте визит');
        const formEl = FormService.getVisitForm(visitData.doctor, true);

        formEl.mainFields.forEach((field, i) => {
            formEl.mainFields[i].value = visitData[field.name];
        });

        formEl.addFields.forEach((field, i) => {
            formEl.addFields[i].value = visitData[field.name]
        });

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

            try {
                const visitEditData = formEl.getData();
                const visitRes = await VisitService.editVisit(visitEditData);
            } catch (error) {
                alert(error);
                console.error(error);
            }

            ModalWindow.closeWindow();
            VisitService.renderAllVisits();
        });

        modal.addForm(formElDom);
        modal.showWindow();
    }

    static async getVisits() {
        if (!Authorization.isLogin()) {
            return [];
        }

        const apiRequest = new Request(API);
        apiRequest.addHeader('Authorization', `Bearer ${Authorization.token}`);

        const visitsData = await apiRequest.get(RESOURCES.cards);
        const visitsObj = [];

        visitsData.forEach(data => {
            if (!data.doctor) return;

            visitsObj.push(this._createDoctorObj(data));
        });

        return visitsObj;
    }

    static async getVisit(visitId) {
        if (!Authorization.isLogin()) {
            return {};
        }

        if (!visitId) {
            return {};
        }

        const apiRequest = new Request(API);
        apiRequest.addHeader('Authorization', `Bearer ${Authorization.token}`);

        const visitData = await apiRequest.get(`${RESOURCES.cards}/${visitId}`);

        if (!visitData || !visitData.doctor) {
            return {};
        }

        return this._createDoctorObj(visitData);
    }

    static async saveVisit(data) {
        if (!Authorization.isLogin()) {
            return {};
        }

        try {
            const apiRequest = new Request(API);
            const newVisit = this._createDoctorObj(data);

            apiRequest.addHeader('Authorization', `Bearer ${Authorization.token}`);

            const responseData = await apiRequest.post(RESOURCES.cards, newVisit);
            newVisit.id = responseData.id;

            return new Promise(resolve => resolve(newVisit));
        } catch(error) {
            return new Promise((resolve, reject) => reject(`Error on saving Visit: ${error}`))
        }
    }

    static async editVisit(data) {
        if (!Authorization.isLogin()) {
            return {};
        }

        try {
            const apiRequest = new Request(API);
            const visitObj = this._createDoctorObj(data);
            const {id, ...content} = visitObj;

            apiRequest.addHeader('Authorization', `Bearer ${Authorization.token}`);
            const responseData = await apiRequest.put(`${RESOURCES.cards}/${id}`, content);

            return new Promise(resolve => resolve(visitObj));
        } catch(error) {
            return new Promise((resolve, reject) => reject(`Error on editing Visit: ${error}`))
        }
    }

    static async delete(visitId, password) {
         try {
             await Authorization.checkPassword(password);

            const apiRequest = new Request(API);
            apiRequest.addHeader('Authorization', `Bearer ${Authorization.token}`);

            const response = await apiRequest.delete(`${RESOURCES.cards}/${visitId}`);
        } catch(error) {
            return new Promise((resolve, reject) => reject(`Login error: ${error}`))
        }
    }

    static _createDoctorObj(data) {
        if (!data.doctor) {
            throw new Error(`Not all data in doctor visit: ${data}`);
        }

        return visitClasses.hasOwnProperty(data.doctor)
            ? new visitClasses['Visit'](data)
            : new visitClasses[`${data.doctor}Visit`](data);
    }

    static _renderVisits(visits = []) {
        const cardsContainer = document.querySelector('.cards-container');
        const fragment = new DocumentFragment();

        if (visits.length === 0){
            cardsContainer.innerHTML = `<p class="ml-5 mt-4">Нет ни одного визита</p>`;
            return;
        }

        visits.forEach(visit => {
            const cardWrapper = document.createElement('div');

            cardWrapper.dataset.cardId = visit.id;
            cardWrapper.classList.add('cardBlock');
            cardWrapper.innerHTML = visit.render();

            VisitDOMListeners.addListeners(cardWrapper);

            fragment.append(cardWrapper);
        });

        cardsContainer.innerHTML = '';
        cardsContainer.append(fragment);
    }
}