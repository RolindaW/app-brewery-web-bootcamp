import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

// Session
let currentUserId = undefined;

// Postgres DB client
const db = new pg.Client({
    host: "localhost",
    port: 5432,
    database: "book-notes",
    user: "postgres",
    password: "postgres",
});
db.connect();

// Server
const app = express();
const port = 3000;

// Middleware

// Custom request logger
app.use((req, res, next) => {
    console.log(`HTTP ${req.method} request on URL ${req.url}`);
    next();
});

// Parse request body into "req.body" instance field
app.use(bodyParser.urlencoded({ extended: true }));

// Define root directory of static files for templating
app.use(express.static("public"));

// Handlers

app.get("/", async (req, res) => {
    try {
        // Get users
        const users = await getUsers();
        console.log(users);
        if (users.length == 0) {
            throw new Error("No users in the system");
        }

        // Set first user as current user - Warning! Only the first time
        if (currentUserId === undefined) {
            currentUserId = parseInt(users[0].id);
        }

        // Get the list of books for which the user has notes (counting the number of notes per book).
        const books = await getBooks(currentUserId);
        console.log(books);

        res.render("index.ejs", {
            users: users,
            currentUser: users.find((user) => user.id === currentUserId),
            books: books,
        });
    } catch (error) {
        console.log(error);
        res.render("index.ejs");
    }
});

app.post("/user", async (req, res) => {
    // console.log(req.body);
    if (req.body.user) {
        currentUserId = parseInt(req.body.user);
        res.redirect("/");
    } else {
        res.render("user.ejs");
    }
});

app.post("/new", async (req, res) => {
    const newUserName = req.body.name;
    const newUserId = await createUser(newUserName);
    currentUserId = newUserId;

    res.redirect("/");
});

// Database

async function getUsers() {
    const result = await db.query("SELECT * FROM user_account");
    return result.rows;
}

async function getBooks(userId) {
    const result = await db.query("SELECT COUNT(book.id) AS note_count, book.* FROM book JOIN note ON book.id = note.book_id WHERE note.user_id = $1 GROUP BY book.id;", [userId]);
    return result.rows;
}

async function createUser(userName) {
    const result = await db.query("INSERT INTO user_account (name) VALUES($1) RETURNING *;", [userName]);
    return parseInt(result.rows[0].id);
}

// Server initilaization
app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});
