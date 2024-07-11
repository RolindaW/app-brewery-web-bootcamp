import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    host: "localhost",
    port: 5432,
    database: "permalist",
    user: "postgres",
    password: "postgres",
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//     { id: 1, title: "Buy milk" },
//     { id: 2, title: "Finish homework" },
// ];

async function getItems() {
    const result = await db.query("SELECT * FROM item;");
    return result.rows;
}

async function createItem(itemTitle) {
    await db.query("INSERT INTO item ( title ) VALUES ( $1 );", [itemTitle]);
}

async function updateItem(itemId, itemTitle) {
    await db.query("UPDATE item SET title = $1 WHERE id = $2;", [itemTitle, itemId]);
}

async function deleteItem(itemId) {
    await db.query("DELETE FROM item WHERE id = $1;", [itemId]);
}

app.get("/", async (req, res) => {
    const items = await getItems();
    res.render("index.ejs", {
        listTitle: "Today",
        listItems: items,
    });
});

app.post("/add", async (req, res) => {
    const itemTitle = req.body.newItem;
    // items.push({ title: item });
    await createItem(itemTitle);
    res.redirect("/");
});

app.post("/edit", async (req, res) => {
    // console.log(req.body);
    const itemId = req.body["updatedItemId"];
    const itemTitle = req.body["updatedItemTitle"];
    await updateItem(itemId, itemTitle);
    res.redirect("/");
});

app.post("/delete", async (req, res) => {
    // console.log(req.body);
    const itemId = req.body["deleteItemId"];
    await deleteItem(itemId);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
