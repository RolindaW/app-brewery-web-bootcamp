var diceNumberPlayer1 = getRandomDiceNumber();
var diceNumberPlayer2 = getRandomDiceNumber();
var winnerPlayerNumber = getWinnerPlayerNumber(diceNumberPlayer1, diceNumberPlayer2);

updatePlayerDice(diceNumberPlayer1, 1);
updatePlayerDice(diceNumberPlayer2, 2);
updateTitle(winnerPlayerNumber);

function getRandomDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function getWinnerPlayerNumber(diceNumberPlayer1, diceNumberPlayer2) {
    if (diceNumberPlayer1 > diceNumberPlayer2) {
        return 1;
    } else if (diceNumberPlayer2 > diceNumberPlayer1) {
        return 2;
    } else {
        return 0;
    }
}

function updatePlayerDice(diceNumber, playerNumber) {
    var filename = getDiceImgFilename(diceNumber);
    setPlayerDiceImgSrc(getPlayerDiceImg(playerNumber), filename);
}

function getDiceImgFilename(diceNumber) {
    return "./images/dice" + diceNumber + ".png";
}

function getPlayerDiceImg(playerNumber) {
    return document.querySelector("img.img" + playerNumber);
}

function setPlayerDiceImgSrc(playerDiceImg, filename) {
    playerDiceImg.setAttribute("src", filename);
}

function updateTitle(winnerPlayerNumber) {
    var message = getMessage(winnerPlayerNumber);
    setTitleText(getTitle(), message);
}

function getMessage(winnerPlayerNumber) {
    if (winnerPlayerNumber == 1) {
        return "❤️ Player 1 Wins!";
    } else if (winnerPlayerNumber == 2) {
        return "Player 2 Wins! ❤️";
    } else {
        return "❤️ Draw! ❤️";
    }
}

function getTitle() {
    return document.querySelector("h1");
}

function setTitleText(title, text) {
    title.textContent = text;
}
