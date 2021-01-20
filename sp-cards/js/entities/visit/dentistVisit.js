import Visit from "./visit.js";
import { urgencyOptions } from '../../constants/visitOptions.js';

export default class DentistVisit extends Visit {
    constructor({ id,
                    doctor = 'Dentist',
                    goal,
                    description,
                    urgency,
                    dateVisit,
                    fullName,
                    lastVisit
    }) {
        super({id, doctor, goal, description, urgency, dateVisit, fullName});
        this.lastVisit = lastVisit;
    }

    _renderMore() {
        super._renderMore();

        return `
            <div class="show-more d-none">
                    <div class="goal mt-2">Цель визита: ${this.goal}</div>
                    <div class="urgency mt-2">Срочность: ${urgencyOptions[this.urgency]}</div>
                    <div class="desc mt-2 ">Описание: ${this.description}</div>
                    <div class="last-visit mt-2">Последнее посещение: ${this.lastVisit}</div>            
            </div>`;
    }
}