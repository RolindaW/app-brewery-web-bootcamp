import inquirer from "inquirer";
import * as qr from "qr-image";
import { createWriteStream } from "node:fs";
import { writeFile } from "node:fs";

const questions = [
    {
        type: "input",
        name: "url",
        message: "Type the URL",
    },
];

inquirer.prompt(questions).then(onAnswer).catch(onError);

function onAnswer(answers) {
    const url = answers.url;
    saveAsQr(url);
    saveAsTxt(url);
}

function onError(error) {
    if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment");
    } else {
        console.error("Something else went wrong");
    }
}

function saveAsQr(url) {
    var qr_png = qr.image(url, { type: "png" });
    qr_png.pipe(createWriteStream("qr-img.png"));
}

function saveAsTxt(url) {
    writeFile("./URL.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
}
