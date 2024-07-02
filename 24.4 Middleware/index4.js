import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// function fakeBodyParser(req, res, next) {
//     req.body = {
//         var: "var-value",
//         baz: "baz-value",
//     };
//     next();
// }

// app.use(fakeBodyParser);

app.get("/", (req, res) => {
    res.sendFile("./public/index.html", { root: __dirname });
});

app.post("/submit", (req, res) => {
    // console.log(req.body);
    const bandName = req.body.street + req.body.pet;
    const html = `<h1>Your band name is:</h1><h2>${bandName}👌</h2>`;
    res.send(html);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
