// debugger;
// Add mouse click event listener to all drum buttons.
var drumButtons = window.document.querySelectorAll("button.drum");
for (var i = 0; i < drumButtons.length; i++) {
    drumButtons[i].addEventListener("click", onClickDrumButton);
}

// Add keyboard keydown event listener to the document.
window.document.addEventListener("keydown", onKeydown);

function onClickDrumButton() {
    playDrum(this.textContent);
    highlightDrum(this.textContent);
}

function onKeydown(event) {
    playDrum(event.key);
    highlightDrum(event.key);
}

function playDrum(drumName) {
    var drumAudiofilename = getDrumAudioFilename(drumName);
    var drumAudio = new Audio(drumAudiofilename);
    drumAudio.play();
}

function getDrumAudioFilename(drumName) {
    var filename;

    switch (drumName) {
        case "w":
            filename = "./sounds/tom-1.mp3";
            break;
        case "a":
            filename = "./sounds/tom-2.mp3";
            break;
        case "s":
            filename = "./sounds/tom-3.mp3";
            break;
        case "d":
            filename = "./sounds/tom-4.mp3";
            break;
        case "j":
            filename = "./sounds/snare.mp3";
            break;
        case "k":
            filename = "./sounds/crash.mp3";
            break;
        case "l":
            filename = "./sounds/kick-bass.mp3";
            break;
        default:
            window.console.log("Unexpected drum name: " + drumName);
            break;
    }

    return filename;
}

function highlightDrum(drumName) {
    var drumButton = window.document.querySelector("button.drum." + drumName);
    drumButton.classList.add("pressed");
    setTimeout(() => {
        drumButton.classList.remove("pressed");
    }, 100);
}
