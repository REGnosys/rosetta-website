"use strict";

const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
let PORT = 8080;

const config = require("./config.js");

const pages = [
  "index",
  "pricing",
  "platform",
  "our-community",
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

// configures express to use hbs
hbs.registerPartials(partialPath);
app.set("view engine", "hbs");
app.set("views", viewPath);

app.get("/", (req, res) => res.render("index.hbs", config));
pages.forEach((page) =>
  app.get(new RegExp(`/(${page}$|${page}.html$)`, "i"), (req, res) =>
    res.render(page + ".hbs", config)
  )
);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
