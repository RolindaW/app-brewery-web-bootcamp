import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

// 1: Fill in your values for the 3 types of auth.
const yourUsername = "rolindaW";
const yourPassword = "pwd123";
const yourAPIKey = "e263b47e-029a-49ea-b0c7-f72afaf1e46e";
const yourBearerToken = "ed3e5500-01be-4c6e-a590-cb083c6df0e1";

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
    // 2: Use axios to hit up the /random endpoint
    //The data you get back should be sent to the ejs file as "content"
    //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
    const url = API_URL + "random";

    try {
        const response = await axios.get(url);
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { content: JSON.stringify(result) });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { content: error.message });
    }
});

app.get("/basicAuth", async (req, res) => {
    // 3: Write your code here to hit up the /all endpoint
    //Specify that you only want the secrets from page 2
    //HINT: This is how you can use axios to do basic auth:
    // https://stackoverflow.com/a/74632908
    /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
    const url = API_URL + "all";
    const parameters = {
        auth: {
            username: yourUsername,
            password: yourPassword,
        },
        params: {
            page: 2,
        },
    };

    try {
        const response = await axios.get(url, parameters);
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { content: JSON.stringify(result) });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { content: error.message });
    }
});

app.get("/apiKey", async (req, res) => {
    // 4: Write your code here to hit up the /filter endpoint
    //Filter for all secrets with an embarassment score of 5 or greater
    //HINT: You need to provide a query parameter of apiKey in the request.
    const url = API_URL + "filter";
    const parameters = {
        params: {
            apiKey: yourAPIKey,
            score: 5,
        },
    };

    try {
        const response = await axios.get(url, parameters);
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { content: JSON.stringify(result) });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { content: error.message });
    }
});

app.get("/bearerToken", async (req, res) => {
    // 5: Write your code here to hit up the /secrets/{id} endpoint
    //and get the secret with id of 42
    //HINT: This is how you can use axios to do bearer token auth:
    // https://stackoverflow.com/a/52645402
    /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
    const url = API_URL + "secrets/2";
    const parameters = {
        headers: {
            Authorization: `Bearer ${yourBearerToken}`,
        },
        urlParams: {
            id: "42",
        },
    };

    try {
        const response = await axios.get(url, parameters);
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { content: JSON.stringify(result) });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { content: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
