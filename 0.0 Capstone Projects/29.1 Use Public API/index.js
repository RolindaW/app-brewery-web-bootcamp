import express from "express";

const app = express();
const port = 3000;

const supportedFeatures = [""];

// Define - by registering as a middleware - root directory of static resources (those referenced by template documents e.g. assets or styles)
app.use(express.static("public"));

// Log incoming requests
app.use((req, res, next) => {
    console.log(`HTTP ${req.method} request on "${req.url}" URL`);
    next();
});

app.get("/", (req, res) => {
    res.render("index.ejs", { features: getFeatures() });
});

app.listen(port, () => {
    console.log(`Server application listening in port ${port}`);
});

function getFeatures() {
    return [new Feature("Armor", "assets/images/armor.svg"), new Feature("Weapon", "assets/images/weapon.svg"), new Feature("Ammo", "assets/images/ammo.svg")];
}

class Feature {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}
