import Visit from "./visit.js";
import {urgencyOptions} from '../../constants/visitOptions.js';

export default class CardiologistVisit extends Visit {
    constructor({ id,
                    doctor = 'Cardiologist',
                    goal,
                    description,
                    urgency,
                    dateVisit,
                    fullName,
                    pressure,
                    bodyMass,
                    illness,
                    age
    }) {
        super({id, doctor, goal, description, urgency, dateVisit, fullName});
        this.pressure = pressure;
        this.bodyMass = bodyMass;
        this.illness = illness;
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
                    <div class="pressure mt-2 ">Обычное давление: ${ this.pressure}</div>           
                    <div class="body-mass mt-2 ">ИМТ: ${this.bodyMass}</div>           
                    <div class="illness mt-2 ">Перенесенные заболевания СС системы: ${this.illness}</div>           
            </div>`;
    }
}