import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "world",
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const result = await db.query("SELECT country_code FROM visited_countries");
    let countries = [];
    result.rows.forEach((country) => {
        countries.push(country.country_code);
    });
    // console.log(result.rows);
    res.render("index.ejs", { countries: countries, total: countries.length });
    // db.end();
});

app.post("/add", async (req, res) => {
    const userCountry = req.body["country"];
    console.log(`User country "${userCountry}"`);

    const result = await db.query("SELECT country_code FROM countries WHERE UPPER(country_name) LIKE UPPER($1)", [userCountry]);
    console.log(result.rows);
    if (result.rows.length > 0) {
        const userCountryCode = result.rows[0]["country_code"];
        console.log(`User country code "${userCountryCode}"`);

        db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [userCountryCode], (err, resultInsert) => {
            if (err) {
                // May throw an error if country already registered. Handle it!
                console.error("Error executing query", err.stack);
                // TODO: Notify the user typed country name is not correct; (use "locals.error" in the EJS index.ejs file)
            } else {
                console.log("Country successfuly registered!");
            }
        });
    } else {
        // TODO: Notify the user typed country name is not correct; (use "locals.error" in the EJS index.ejs file)
        console.error("Country not found.");
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
