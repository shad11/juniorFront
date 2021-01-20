export default class Select {
  constructor({label, name, options = {}, classNames = [], id = `${Math.random()}`}) {
    this.label = label;
    this.name = name;
    this.options = options;
    this.id = id;
    this.classNames = classNames.join(' ');
    this.value = ''
  }

  render(){
    const isClass  = this.classNames ? `class='${this.classNames}'` : '';
    const selectGroup = document.createElement('div');
    selectGroup.classList.add('form-group');

    selectGroup.innerHTML = `
      <label for="${this.id}">${this.label}</label>
      <select 
        name='${this.name}'
        id='${this.id}'
        ${isClass}> 
        ${this._renderOptions()}
      </select>`;

    return selectGroup;
  }

  _renderOptions() {
    let optionsStr = '';

    for (const option in this.options) {
      this.value === option
          ? optionsStr += `<option value="${option}" selected>${this.options[option]}</option>`
          : optionsStr += `<option value="${option}">${this.options[option]}</option>`;
    }

    return optionsStr;
  }
}


// <div class="form-group">
//   <label for="exampleFormControlSelect1">Example select</label>
//   <select name="name" class="form-control" id="exampleFormControlSelect1">
//     <option value="value">1</option>
//     <option value="value" selected>2</option>
//     <option value="value">3</option>
//     <option value="value">4</option>
//     <option value="value">5</option>
//   </select>
// </div>