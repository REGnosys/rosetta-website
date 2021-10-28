"use strict";

const express = require("express");
const path = require("path");
const hbs = require("hbs");
const countries = require("country-data-list").countries;

const app = express();
let PORT = process.env.PORT || 5000;

const config = require("./config.js");
const countryList = countries.all.sort((a, b) =>
  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
);

const pages = [
  "index",
  "pricing",
  "platform",
  "community",
  "monitor",
  "it-security",
  "ingest-and-translate",
  "governance",
  "engine",
  "design",
  "deploy",
  "contact-support",
  "contact-sales-thankyou",
  "contact-sales",
  "contact",
];

// servers any appropriate static files(i.e. css, js, etc)
const publicPath = path.join(__dirname, "../web/assets");
app.use("/assets", express.static(publicPath));

// setups hbs view path, where express will look for files
const partialPath = path.join(__dirname, "../src/views/partials");
const viewPath = path.join(__dirname, "../src/views");

const handleSend = (req, res) => {
  const secret_key = config.recaptcha_secret;
  const token = req.body.token;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => res.json({ google_response }))
    .catch((error) => res.json({ error }));
};

// configures express to use hbs
hbs.registerPartials(partialPath);
app.set("view engine", "hbs");
app.set("views", viewPath);

app.get("/", (req, res) => res.render("index.hbs", { config }));
pages.forEach((page) =>
  app.get(new RegExp(`/(${page}$|${page}.html$)`, "i"), (req, res) =>
    res.render(page + ".hbs", { config, countryList })
  )
);

app.post("/api/send", handleSend);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
