import express from "express";
import bodyParser from "body-parser";

let myPostList = [];

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/submit", (req, res) => {
    // Warning! When refreshing the post creation page, an automatic submit is made which triggers the reprocessing of the last call.
    myPostList.push(req.body);
    res.render("index.ejs", { postList: myPostList });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
