import {inputObject} from "../../constants/input.js";
import Button from "./button.js";
import {inputClasses} from "../../constants/input.js";

export default class Form {
    constructor(id, mainFields = [], addFields = [], controls =[]) {
        this._id = id;
        this.mainFields = [];
        this.addFields = [];
        this.controls = controls;

        mainFields.forEach(data => {
            const field = this._createField(data);

            this.mainFields.push(field);
        });

        addFields.forEach(data => {
            const field = this._createField(data);

            this.addFields.push(field);
        });
    }

    setAddFields(addFields = []) {
        this.addFields = [];

        addFields.forEach(data => {
            const field = this._createField(data);

            this.addFields.push(field);
        });
    }

    getData() {
        const form = document.getElementById(this._id);
        const formData = new FormData(form);
        const content = {};

        for (const pair of formData.entries()) {
            content[pair[0]] = pair[1].trim();
        }

        return content;
    }

    getFormDOM() {
        const formEl = document.createElement('form');
        formEl.id = this._id;
        const wrap = document.createElement('div');
        wrap.className = 'wrapper';

        const fragment = new DocumentFragment();

        this.mainFields.forEach(elem => fragment.append(elem.render()));

        const addFieldsEl = document.createElement('div');
        addFieldsEl.id = 'addFormFields';
        this.addFields.forEach(elem => addFieldsEl.append(elem.render()));

        fragment.append(addFieldsEl);
        wrap.append(fragment);

        const btnsBlock = document.createElement('div');
        inputClasses.btnsDiv.forEach(className => btnsBlock.classList.add(className));

        this.controls.forEach(({...params}) => {
            const btn = new Button(params);
            btnsBlock.append(btn.render());
        });

        formEl.append(wrap, btnsBlock);

        return formEl;
    }

    reRenderAddFields() {
        const formEl = document.getElementById('addFormFields');

        const fragment = new DocumentFragment();
        this.addFields.forEach(elem => fragment.append(elem.render()));

        formEl.innerHTML = '';
        formEl.append(fragment);
    }

    _createField(data) {
        const {elementType: className, ...params} = data;

        return new inputObject[className](params);
    }
}