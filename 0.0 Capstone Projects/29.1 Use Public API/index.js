import express from "express";

const app = express();
const port = 3000;

let featureName = undefined;
let page = undefined;
let items = undefined;

// Define - by registering as a middleware - root directory of static resources (those referenced by template documents e.g. assets or styles)
app.use(express.static("public"));

// Log incoming requests
app.use((req, res, next) => {
    console.log(`HTTP ${req.method} request on "${req.url}" URL`);
    next();
});

app.get("/", (req, res) => {
    featureName = undefined;
    res.render("index.ejs", { features: getFeatures() });
});

app.get("/armor", (req, res) => {
    // Reset page index if corresponding feature card page is not being redirected by itself (i.e. paging)
    if (featureName != "armor") {
        featureName = "armor";
        page = 1;
    }

    items = getItemsMock();
    // items = getItems();

    res.render("feature-card.ejs", {
        features: getFeatures(),
        featureName: featureName,
        page: page,
        items: items,
    });
});

app.get("/armor-prev", (req, res) => {
    // Decrement page index
    page -= 1;
    res.redirect("/armor");
});

app.get("/armor-next", (req, res) => {
    // Increment page index
    page += 1;
    res.redirect("/armor");
});

app.listen(port, () => {
    console.log(`Server application listening in port ${port}`);
});

function getFeatures() {
    return [new Feature("Armor", "/armor", new Image("assets/images/armor.svg", "armor")), new Feature("Weapon", "/weapon", new Image("assets/images/weapon.svg", "weapon")), new Feature("Ammo", "/ammo", new Image("assets/images/ammo.svg", "ammo"))];
}

function getItemsMock() {
    return [new Item("Item 1", new Image("assets/images/armor.svg", "sample item 1")), new Item("Item 2", new Image("assets/images/armor.svg", "sample item 2")), new Item("Item 3", new Image("assets/images/armor.svg", "sample item 3"))];
}

class Feature {
    constructor(name, link, image) {
        this.name = name;
        this.link = link;
        this.image = image;
    }
}

class Item {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}

class Image {
    constructor(filename, description) {
        this.filename = filename;
        this.description = description;
    }
}
