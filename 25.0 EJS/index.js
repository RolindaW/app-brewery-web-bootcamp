import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const currentDate = new Date();
    let day = currentDate.getDay();

    let week = "a weekday";
    let task = "work hard";
    if ([0, 6].includes(day)) {
        week = "the weekend";
        task = "have fun";
    }

    // res.send("<h1>Hey! It is " + week + ", it is time to " + task + "!</h1>");
    res.render("index.ejs", { week: week, task: task });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
