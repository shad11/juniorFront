export default class Button {
    constructor({type, classNames = [], isDismiss, text}) {
        this.type = type;
        this.classNames = classNames;
        this.isDismiss = !!isDismiss;
        this.text = text;
    }

    render() {
        const btn = document.createElement('button');
        btn.setAttribute('type', this.type);
        this.classNames.forEach(className => btn.classList.add(className));
        if (this.isDismiss) btn.setAttribute('data-dismiss', 'modal');
        btn.innerHTML = this.text;

        return btn;
    }
}