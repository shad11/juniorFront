import Game from './entity/game.js';

const onReady = () => {
    document.querySelector('.start-btn')
        .addEventListener('click', Game.startGame);

    document.querySelector('.end-btn')
        .addEventListener('click', Game.stopGame);

    document.querySelector('.pause-btn')
        .addEventListener('click', Game.pauseGame);
};

document.addEventListener('DOMContentLoaded', onReady);