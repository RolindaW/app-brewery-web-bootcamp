import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile("./public/index.html", { root: __dirname });
});

app.post("/check", (req, res) => {
    const password = req.body["password"];
    if (isValidPassword(password)) {
        res.sendFile("./public/secret.html", { root: __dirname });
    } else {
        // res.sendFile("./public/index.html", { root: __dirname });
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

function isValidPassword(password) {
    return password === "ILoveProgramming";
}
