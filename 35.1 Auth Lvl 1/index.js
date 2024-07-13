import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    host: "localhost",
    port: 5432,
    database: "secrets",
    user: "postgres",
    password: "postgres",
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.post("/register", async (req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];
    // console.log(email);
    // console.log(password);
    try {
        const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [username, password]);
        console.log(result);
        res.render("secrets.ejs");
    } catch (error) {
        // TODO: user may already exists; this should be handled and notified back to the user.
        console.log(error);
        res.redirect("/register");
    }
});

app.post("/login", async (req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2;", [username, password]);
        if (result.rows.length) {
            res.render("secrets.ejs");
        } else {
            throw new Error("Username/Password does not match an existing user account.");
        }
    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
