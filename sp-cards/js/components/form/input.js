export default class Input {
  constructor ({label, type, name, value = '', classNames = [], id = `${Math.random()}`, required = false, placeholder, minValue = ''}){
    this.label = label;
    this.type = type;
    this.name = name;
    this.classNames = classNames.join(' ');
    this.id = id;
    this.required = required;
    this.placeholder = placeholder;
    this.value = value;
    this.minValue = minValue;
  }

  render(){
    const isClass  = this.classNames ? `class='${this.classNames}'` : '';
    const isName = this.name ? `name='${this.name}'` : '';
    const isRequired  = this.required ? `required='${this.required}'` : '';
    const isPlaceholder  = this.placeholder ? `placeholder='${this.placeholder}'` : '';
    const isMinValue = this.minValue ? `min='${this.minValue}'` : '';

    const formGroup = document.createElement('div');

    if (this.type === "hidden") {
        formGroup.innerHTML = `<input
        type="${this.type}"
        ${isName}
        id="${this.id}"
        value="${this.value}"
      />`;
    } else {
        formGroup.innerHTML = `<label for="${this.id}">${this.label}</label>
      <input
        type="${this.type}"
        ${isName}
        ${isClass}
        id="${this.id}"
        ${isRequired}
        ${isPlaceholder}
        value="${this.value}"
        ${isMinValue}
      />`;

        formGroup.classList.add('form-group');
    }

    return formGroup;
  }
}

// <div class="form-group">
//   <label for="name">Password</label>
//   <input type="password" name="name" class="form-control" id="name">
// </div>