const SIZE = 8;
const BOMB_CNT = 10;

let bombUserCnt = 0;

const openTable = () => {
    const tableEl = document.querySelector('table');
    tableEl.classList.add('active');
};

const openTdEl = (rowCur, colCur) => {
    const rowEL = document.querySelector(`#tr-${rowCur}`);

    if (!rowEL) {
        return;
    }

    const elem = rowEL.querySelector(`#td-${colCur}`);

    if (!elem || elem.classList.contains('active')) {
        return;
    }

    elem.classList.add('active');

    if (!elem.querySelector('span')) {

        for (let row = rowCur - 1; row <= rowCur + 1; row++) {

            for (let col = colCur - 1; col <= colCur + 1; col++) {
                if (row === rowCur && col === colCur) {
                    continue;
                }

                openTdEl(row, col);
            }
        }
    }
};

const clickElLeft = elem => {
    if (elem.tagName !== 'TD') {
        return;
    }

    if (elem.classList.contains('flag')) {
        return;
    }

    if (elem.classList.contains('bomb')) {
        openTable();
        return;
    }

    const rowCur = parseInt(elem.closest('tr').id.match(/\d+/)[0]);
    const colCur = parseInt(elem.closest('td').id.match(/\d+/)[0]);

    openTdEl(rowCur, colCur);
};

const clickElRight = elem => {
    const divEl = document.querySelector('div');

    bombUserCnt += elem.classList.contains('flag') ? -1 : 1;

    elem.classList.toggle('flag');
    divEl.innerText = `Кол-во мин: ${bombUserCnt}/${BOMB_CNT}`;
};

const clearBody = () => {
    const tableOld = document.querySelector('table');

    bombUserCnt = 0;
    document.querySelector('.game-btn').style.visibility = 'hidden';

    if (tableOld) {
        tableOld.remove();
        document.querySelector('div').remove();
    }
};

const checkGameBtn = () => {
    const gameBtn = document.querySelector('.game-btn');

    if (gameBtn.style.visibility === 'hidden') {
        gameBtn.style.visibility = 'visible';
    }
};

const createTable = () => {
    const tableEl = document.createElement('table');

    for (let i = 0; i < SIZE; i++) {
        const trEl = document.createElement('tr');
        trEl.id = `tr-${i}`;

        for (let j = 0; j < SIZE; j++) {
            const tdEl = document.createElement('td');
            tdEl.id = `td-${j}`;
            trEl.append(tdEl);
        }

        tableEl.append(trEl);
    }

    return tableEl;
};

const drawTable = () => {
    clearBody();

    const table = createTable();
    const pointEl = document.createElement('div');

    pointEl.style.marginBottom = '10px';
    pointEl.innerText = `Кол-во мин: ${bombUserCnt}/${BOMB_CNT}`;

    table.addEventListener('click', event => {
        checkGameBtn();
        clickElLeft(event.target);
    });

    table.addEventListener('contextmenu', event => {
        event.preventDefault();
        checkGameBtn();
        clickElRight(event.target);
    });

    document.body.append(pointEl, table);
};

const generateBombs = () => {
    let bombCnt = 0;

    while (bombCnt < BOMB_CNT) {
        const trBombId = Math.floor(Math.random() * SIZE);
        const tdBombId = Math.floor(Math.random() * SIZE);

        const tdElBomb = document.querySelector(`#tr-${trBombId} #td-${tdBombId}`);

        if (tdElBomb.classList.contains('bomb')) {
            continue;
        }

        tdElBomb.classList.add('bomb');
        bombCnt++;
    }
};

const markBombs = () => {
    const tdList = document.querySelectorAll('td');

    tdList.forEach(tdEl => {
        if (tdEl.classList.contains('bomb')) {
            return;
        }

        let bombCnt = 0;

        const rowCur = parseInt(tdEl.closest('tr').id.match(/\d+/)[0]);
        const colCur = parseInt(tdEl.closest('td').id.match(/\d+/)[0]);

        for (let row = rowCur - 1; row <= rowCur + 1; row++) {
            const rowEL = document.querySelector(`#tr-${row}`);

            if (!rowEL) {
                continue;
            }

            for (let col = colCur - 1; col <= colCur + 1; col++) {
                if (row === rowCur && col === colCur) {
                    continue;
                }

                const colEl = rowEL.querySelector(`#td-${col}`);

                if (!colEl) {
                    continue;
                }

                if (colEl.classList.contains('bomb')) {
                    bombCnt++;
                }
            }
        }

        if (bombCnt > 0) {
            const spanEl = document.createElement('span');
            spanEl.innerText = bombCnt;
            tdEl.append(spanEl);
        }
    })
};

const newGame = () => {
    drawTable();
    generateBombs();
    markBombs();
};

const onReady = () => {
    newGame();

    document.querySelector('.game-btn').addEventListener('click', newGame);
};

document.addEventListener('DOMContentLoaded', onReady);