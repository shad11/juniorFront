import Visit from "./visit.js";
import { urgencyOptions } from '../../constants/visitOptions.js';

export default class TherapistVisit extends Visit {
    constructor({ id,
                    doctor = 'Therapist',
                    goal,
                    description,
                    urgency,
                    dateVisit,
                    fullName,
                    age
    }) {
        super({id, doctor, goal, description, urgency, dateVisit, fullName});
        this.age = age;

    }

    _renderMore() {
        super._renderMore();

        return `
            <div class="show-more d-none">
                     <div class="age mt-2">Возраст: ${this.age}</div> 
                    <div class="goal mt-2">Цель визита: ${this.goal}</div>
                    <div class="urgency mt-2">Срочность: ${urgencyOptions[this.urgency]}</div>
                    <div class="desc mt-2 ">Описание: ${this.description}</div>           
            </div>`;
    }
}