import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_BASE_URL = "https://eldenring.fanapis.com/api/";

let featureName = undefined;
let page = undefined;
const limit = 50;

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

app.get("/armor", async (req, res) => {
    // Reset page index if corresponding feature card page is not being redirected by itself (i.e. paging)
    if (featureName != "armor") {
        featureName = "armor";
        page = 1;
    }

    // Get corresponding items
    try {
        const result = await axios.get(getRoute(), getParameters());
        const data = result.data;
        // console.log(data);

        const items = formatItems(data.data);
        // console.log(items);

        res.render("feature-card.ejs", {
            features: getFeatures(),
            featureName: featureName,
            page: page,
            limit: limit,
            items: items,
        });
    } catch (error) {
        res.render("feature-card.ejs", {
            features: getFeatures(),
            error: JSON.stringify(error.response.data),
        });
    }
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

function formatItems(rawItems) {
    let formattedItems = [];

    rawItems.forEach((rawItem) => {
        const formattedItem = new Item(rawItem.id, rawItem.name, new Image(rawItem.image, rawItem.description));
        formattedItems.push(formattedItem);
    });

    return formattedItems;
}

function getRoute() {
    switch (featureName) {
        case "armor":
            return API_BASE_URL + "armors";
        default:
            return API_BASE_URL;
    }
}

function getParameters() {
    return {
        params: {
            limit: limit,
            page: page - 1,
        },
    };
}

class Feature {
    constructor(name, link, image) {
        this.name = name;
        this.link = link;
        this.image = image;
    }
}

class Item {
    constructor(id, name, image) {
        this.id = id;
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
