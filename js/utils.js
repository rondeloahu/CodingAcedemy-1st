'use strict';

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isWin() {
    if (gFlagNumCorrect === gLevel.mines && allFlipped()) {
        gGame.isOn = false;
        return true;
    }
    return false;
}
function allFlipped() {
    var numbersCount = (gLevel.size ** 2) - gLevel.mines;
    console.log('hiw many nums need to be flipped:', numbersCount);
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isShown) {
                numbersCount--;
            }
            if (numbersCount === 0) {
                return true
            }
        }
    }
    return false;
}

function resetGame() {
    gGame.secsPassed = 0;
    gBoard = [];
    gstartTime = 0;
    gSafeClicks = 3;
    gSafeClickBtn.classList.remove('disable-btn');
    gSafeClickBtn.innerHTML = `Safe Click [<span>3</span>]`;
    gLives = 2;
    gGame.isOn = false;
    gFlagNumCorrect = 0;
    elTime.innerText = 0;
    gLevel.mines = (gLevel.Difficulty === 1) ? 2 : (gLevel.Difficulty === 2) ? 12 : 30;
    elIcon.innerHTML = ' 😁';
    elMsg.classList.add('hideElem')
    var hints = document.querySelectorAll('.hint-btn');
    for (var i = 0; i < hints.length; i++) {
        hints[i].classList.remove('hideElem');
    }
    for (var i = 0; i < livesShowns.length; i++) {
        livesShowns[i].classList.remove('hideElem');
    }
    clearInterval(gGame.secsPassed);
    init();
}

function getHint(elm) {
    elm.classList.add('hideElem');
    gHint = true;
}

function closeHintMode(elCell, i, j) {
    for (var x = i - 1; x <= i + 1; x++) {
        if (x < 0 || x >= gBoard.length) continue;
        for (var y = j - 1; y <= j + 1; y++) {
            if (y < 0 || y >= gBoard[0].length) continue;
            if (gBoard[x][y].isShown === false) {
                var elCellBenith = document.querySelector(`[data-i="${x}"][data-j="${y}"]`);
                elCellBenith.classList.add('hideElem');
                var elCellup = document.querySelector(`[data-ii="${x}"][data-jj="${y}"]`);
                elCellup.classList.remove('hideElem');
            }
        }
        gHint = false;
    }
}

function timer() {
    var time = (Date.now() - gstartTime);
    elTime.innerText = Math.floor(time / 1000);
}

function getEmptyCells(board, pos) {
    var row = pos.i;
    var col = pos.j;
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = 0; j < board[0].length; j++) {
            if (j < 0 || j >= board[0].length) continue;
            if (i === row && j === col) continue;
            if (board[i][j]) emptyCells.push({ i, j });
        }
    }
    return emptyCells;
}

function records() {
    switch (gLevel.Difficulty){
        case 1:{
            elRecord.innerText = localStorage.getItem("easyRecord");
            break;
        }
        case 2:{
            elRecord.innerText = localStorage.getItem("normalRecord");
            break;
        }
        case 3:{
            elRecord.innerText = localStorage.getItem("hardRecord");
            break;

        }
    }
}