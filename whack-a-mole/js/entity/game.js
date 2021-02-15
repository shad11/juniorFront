import { SIZE, LEVELS } from "../constants/game.js";
import Table from "./table.js";

export default(() => {
    let tableObj;
    let timerGame;
    let timerNewGame;
    let paused = false;

    const startGame = () => {
        const level = document.querySelector(`select[name='level']`).value || 'easy';
        const ms = LEVELS[level];

        if (!paused && tableObj.checkActivateTd()) {
            tableObj.deleteTd();
        }

        tableObj.activateTd();

        timerGame = setInterval(() => {
            tableObj.deleteTd();

            if (tableObj.checkWin()) {
                clearInterval(timerGame);
                changeMenuFocus();
                return;
            }

            tableObj.activateTd();
        }, ms);

    };

    const createTable = () => {
        const elemTable = document.createElement('table');
        tableObj = new Table(SIZE);

        for (let i = 0; i < SIZE; i++) {
            const elemTR = document.createElement('tr');
            for (let j = 0; j < SIZE; j++){
                const id = i * SIZE + j;
                const tdEl = document.createElement('td');

                tdEl.id = `td-${id}`;
                tableObj.addTd(id);

                elemTR.append(tdEl);
            }
            elemTable.append(elemTR);
        }

        return elemTable;
    };


    const renderTable = () => {
        const rootEl = document.querySelector('.main-table');
        const tableEl = createTable();

        rootEl.innerHTML = '';
        rootEl.append(tableEl);
    };

    const changeMenuFocus = () => {
        document.querySelector('.header__new-game').classList.toggle('disable');
        document.querySelector('.header__stop-game').classList.toggle('disable');
    };

    const newGame = () => {
        const timerEl = document.querySelector('.start-timer');

        renderTable();

        let startSec = 5;
        timerEl.innerText = `Start in ${startSec} sec`;

        timerNewGame = setTimeout(function checkTimer() {
            startSec--;

            if (startSec === 0) {
                clearTimeout(timerNewGame);
                timerEl.innerText = '';
                startGame();
                changeMenuFocus();
            } else {
                timerEl.innerText = `Start in ${startSec} sec`;
                timerNewGame = setTimeout(checkTimer, 1000);
            }
        }, 1000);
    };

    const stopGame = () => {
        clearInterval(timerGame);
        document.querySelector('.main-table').innerHTML = '';
        changeMenuFocus();
    };

    const pauseGame = () => {
        const pauseEl = document.querySelector('.pause-btn');
        paused = !paused;

        if (paused) {
            pauseEl.innerText = 'Start game';
            clearInterval(timerGame);
        } else {
            pauseEl.innerText = 'Pause game';
            startGame();
        }
    };

    return {
        startGame: newGame,
        stopGame,
        pauseGame
    }
})();