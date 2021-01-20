import Visit from "../entities/visit/visit.js";
import CardiologistVisit from "../entities/visit/cardiologistVisit.js";
import DentistVisit from "../entities/visit/dentistVisit.js";
import TherapistVisit from "../entities/visit/therapistVisit.js";
import {inputClasses} from "./input.js";

const today = new Date();
const yyyy = today.getFullYear();
const mm = today.getMonth() + 1;
const dd = today.getDate();
const currDate = `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`;

const doctors = {
    Therapist: 'Терапевт',
    Cardiologist: 'Кардиолог',
    Dentist: 'Стоматолог',
};

const urgencyOptions = {
    usual: 'обычная',
    priority: 'приоритетная',
    high: 'неотложная',
};

const statusOptions = {
    open: 'открыт',
    closed: 'закрыт'
};

export const visitBase = {
    class: 'Visit',
    fields: [
        {name: 'id', elementType: 'input', type: 'hidden', id: 'id', required: true},
        {name: 'dateVisit', label: 'Дата посещения', elementType: 'input', type: 'date', value: currDate, required: true, id: 'dateVisit', classNames: inputClasses.visitInputs},
        {name: 'goal', label: 'Цель визита', elementType: 'input', type: 'text', required: true, id: 'visitTarget', classNames: inputClasses.visitInputs},
        {name: 'description', label: 'Краткое описание визита', elementType: 'textarea', type: 'text', id: 'shortDesc', classNames: inputClasses.visitInputs},
        {name: 'urgency', label: 'Срочность', elementType: 'select', options: urgencyOptions, id: 'selectUrgency', classNames: inputClasses.visitInputs},
        {name: 'fullName', label: 'ФИО', elementType: 'input', type: 'text', required: true, id: 'fullName', classNames: inputClasses.visitInputs}
    ]
};

export const visitOptions = new Map([
    ['Cardiologist', {
        class: 'CardiologistVisit',
        fields: [
            {name: 'pressure', label: 'Давление', elementType: 'input', type: 'text', id: 'bloodPressure', classNames: inputClasses.visitInputs, required: true},
            {name: 'bodyMass', label: 'Индекс массы тела', elementType: 'input', type: 'number', id: 'massIndex', classNames: inputClasses.visitInputs, required: true, minValue: '0'},
            {name: 'illness', label: 'Перенесенные заболевания сердечно-сосудистой системы', elementType: 'input', type: 'text', id: 'pastDiseases', classNames: inputClasses.visitInputs, required: true},
            {name: 'age', label: 'Возраст', elementType: 'input', type: 'number', id: 'age', classNames: inputClasses.visitInputs, required: true, minValue: '0'}
        ]
    }],
    ['Dentist', {
        class: 'DentistVisit',
        fields: [
            {name: 'lastVisit', label: 'Дата последнего посещения', elementType: 'input', type: 'date', required: true, id: 'lastVisit', classNames: inputClasses.visitInputs}
        ]
    }],
    ['Therapist', {
        class: 'TherapistVisit',
        fields: [
            {name: 'age', label: 'Возраст', elementType: 'input', type: 'number',  id: 'age', required: true, classNames: inputClasses.visitInputs, minValue: '0'}
        ]
    }]
]);

export const visitClasses = { Visit, CardiologistVisit, DentistVisit, TherapistVisit };
export {doctors, urgencyOptions, statusOptions};