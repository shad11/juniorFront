 import Input from './input.js';

export default class Textarea extends Input {
  constructor({label, name, type, required, classNames, id, rows = 3}) {
    super({label, name, type, required, classNames, id});
    this._rows  = rows;
  }

  set rows(value){
    this._rows = value;
  }

  render(){
    const isClass  = this.classNames ? `class='${this.classNames}'` : '';
    const isRequired  = this.required ? `required='${this.required}'` : '';

    const textAreaGroup = document.createElement('div');
    textAreaGroup.classList.add('form-group');
    textAreaGroup.innerHTML = `
      <label for="${this.id}">${this.label}</label>
      <textarea
        name="${this.name}"
        rows="${this._rows}"
        ${isClass}
        ${isRequired}
        id="${this.id}"
      >${this.value}</textarea>`;

    return textAreaGroup;
  }
}

// <div class="form-group">
//   <label for="exampleFormControlTextarea1">Example textarea</label>
//   <textarea name="name" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
// </div>