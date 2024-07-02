// Global variables

var buttonColors = ["red", "blue", "green", "yellow"];
var gameLevel = 0;
var gamePattern = [];
var userPattern = [];

// Main

startGameOnFirstDocumentKeydown();

// Engine - Game start

function startGameOnFirstDocumentKeydown() {
    // Warning! Event handler must be executed only once
    $(document).one("keydown", startGame);
}

function startGame() {
    resetGameState();
    enableButtons();
    runLevel();
}

function resetGameState() {
    resetGameLevel();
    resetGamePattern();
    resetUserPattern();
}

// Engine - Game level - Initialize

function runLevel() {
    var randomButtonColor = nextSequence();
    setGameLevelTitle();
    playButtonFade(randomButtonColor);
}

function nextSequence() {
    var randomButtonColor = getRandomButtonColor();
    updateGamePattern(randomButtonColor);
    increaseGameLevel();
    return randomButtonColor;
}

function getRandomButtonColor() {
    var randomButtonColorIndex = generateRandomNumber(buttonColors.length);
    return getButtonColor(randomButtonColorIndex);
}

function getButtonColor(index) {
    return buttonColors[index];
}

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// Engine - Game level - Play

function checkAnswer(userChosenColor) {
    var gameColor = gamePattern[userPattern.length];
    return userChosenColor == gameColor;
}

function isLevelCompleted() {
    return gamePattern.length == userPattern.length;
}

function nextLevel() {
    disableButtons();
    setTimeout(() => {
        enableButtons();
        resetUserPattern();
        runLevel();
    }, 1000);
}

// Engine - Game over

function gameOver() {
    disableButtons();
    playButtonError();
    setGameOverTitle();
    startGameOnFirstDocumentKeydown();
}

// Engine - Misc

function resetGamePattern() {
    gamePattern = [];
}

function updateGamePattern(color) {
    gamePattern.push(color);
}

function resetUserPattern() {
    userPattern = [];
}

function updateUserPattern(color) {
    userPattern.push(color);
}

function resetGameLevel() {
    gameLevel = 0;
}

function increaseGameLevel() {
    gameLevel++;
}

// Button

function enableButtons() {
    $(".btn").on("click", playButton);
}

function disableButtons() {
    $(".btn").off("click", playButton);
}

// Warnin! Event target will be same as handler (i.e. the button itself)
function playButton() {
    var userChosenColor = this.id;
    playButtonPress(userChosenColor);
    if (checkAnswer(userChosenColor)) {
        updateUserPattern(userChosenColor);
        if (isLevelCompleted()) {
            nextLevel();
        }
    } else {
        gameOver();
    }
}

function playButtonFade(color) {
    playButtonAudio(color);
    animateButtonFade(color);
}

function playButtonPress(color) {
    playButtonAudio(color);
    animateButtonPress(color);
}

function playButtonError() {
    playErrorAudio();
    animateBodyBackground();
}

// Title

function setGameLevelTitle() {
    const gameLevelTitle = getGameLevelTitle();
    setTitle(gameLevelTitle);
}

function setGameOverTitle() {
    const gameOverTitle = getGameOverTitle();
    setTitle(gameOverTitle);
}

function setTitle(text) {
    $("#level-title").text(text);
}

// Sound

function playButtonAudio(color) {
    buttonAudioFilename = getButtonAudioFilename(color);
    playAudio(buttonAudioFilename);
}

function playErrorAudio() {
    errorAudioFilename = getErrorAudioFilename();
    playAudio(errorAudioFilename);
}

function playAudio(filename) {
    var audio = new Audio(filename);
    audio.play();
}

// Animation

function animateButtonFade(id) {
    const button = $("#" + id);
    button.fadeOut(100).fadeIn(100);
}

function animateButtonPress(id) {
    const button = $("#" + id);
    button.addClass("pressed");
    setTimeout(() => {
        button.removeClass("pressed");
    }, 100);
}

function animateBodyBackground() {
    const body = $("body");
    body.addClass("game-over");
    setTimeout(() => {
        body.removeClass("game-over");
    }, 200);
}

// Filename

function getButtonAudioFilename(name) {
    return "./sounds/" + name + ".mp3";
}

function getErrorAudioFilename() {
    return "./sounds/wrong.mp3";
}

// Text

function getGameLevelTitle() {
    return "Level " + gameLevel;
}

function getGameOverTitle() {
    return "Game Over! Press Any Key To Restart";
}
