import { urgencyOptions, doctors } from '../../constants/visitOptions.js';

export default class Visit {
    constructor({ id,
                    doctor = 'Unknown',
                    goal = '',
                    description = '',
                    urgency = 'usual',
                    dateVisit,
                    fullName
    }) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = today.getMonth() + 1;
        const dd = today.getDate();

        this.id = id;
        this.doctor = doctor;
        this.goal = goal;
        this.description = description;
        this.urgency = urgency;
        this.dateVisit = !dateVisit
            ? `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`
            : dateVisit ;
        this.fullName = fullName;
    }

    set id(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    _renderMore() {
        return `
            <div class="show-more d-none">
                    <div class="goal mt-2">Цель визита: ${this.goal}</div>
                    <div class="urgency mt-2">Срочность: ${urgencyOptions[this.urgency]}</div>
                    <div class="desc mt-2 ">Описание: ${this.description}</div>      
            </div>`;
    }

    render() {
        const moreBlock = this._renderMore();

        return `<div class="card bg-light p-3 pt-1 mb-3 ml-3" draggable="true">
              <div class="text-right"><span class="close-span btn btn-outline-success">&#10008;</span></div>
            <div class="fio mt-2">${this.fullName}</div>
            <div class="doctor mt-2">${doctors[this.doctor] || 'Неизвестный доктор'}</div>
             ${moreBlock}
            <div class="button-wrapper text-right mt-3">
                <button type="button" class="btn card-btn btn-success more-btn">Показать больше</button>
                <button type="button" class="btn card-btn btn-success menu-btn">
                 <i class="fa fa-ellipsis-v"></i>
                </button>  
             </div>          
                <div class="select-wrapper menu-visit  d-none">
                     <ul class="menu-ul">
                        <li class="pl-3 pr-2 edit-btn">Редактировать</li>
                        <li class="pl-3 pr-2 delete-btn">Удалить</li>
                     </ul>
                </div> 
            </div>`;
    }
}