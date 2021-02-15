import ActiveTD from "./activeTD.js";

export default class Table {
    WIN_CELLS_CNT = 0;
    #cellsSet;
    #userCells;
    #systemCells;
    #activeTd;

    constructor(size) {
        this.WIN_CELLS_CNT = size**2/2;
        this.#cellsSet = new Set();
        this.#userCells = this.#systemCells = [];
    }

    addTd(id) {
        this.#cellsSet.add(id);
    }

    activateTd() {
        this.#activeTd = new ActiveTD(this.#getCellIdFree());
    }

    checkActivateTd() {
        return !!this.#activeTd;
    }

    deleteTd() {
        if (this.#activeTd.userClick) {
            this.#userCells = [...this.#userCells, this.#activeTd.id];
        } else {
            this.#systemCells = [...this.#systemCells, this.#activeTd.id];
        }

        this.#activeTd.removeClickEvent();
        this.#cellsSet.delete(this.#activeTd.id);
    }

    checkWin() {
        if (this.#userCells.length >= this.WIN_CELLS_CNT) {
            alert('WOW! Congratulations, you win!');
            return true;
        }

        if (this.#systemCells.length >= this.WIN_CELLS_CNT) {
            alert('Oops! Game over, you\'ve lost!');
            return true;
        }

        return false;
    }

    #getCellIdFree() {
        const max = this.#cellsSet.size;
        const randomId = Math.floor(Math.random() * max);

        return [...this.#cellsSet][randomId];
    }
}