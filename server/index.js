const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const hbs = require("hbs");
const helpers = require("handlebars-helpers");
const countries = require("country-data-list").countries;
const config = require("./config.js");

const PORT = process.env.PORT || 8000;

const countryList = countries.all.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

const pages = [
    "pricing",
    "platform",
    "community",
    "monitor",
    "it-security",
    "ingest-and-translate",
    "open-source",
    "engine",
    "design",
    "deploy",
    "contact-support",
    "contact-sales",
    "contact",
    "terms-of-use",
    "privacy-policy",
];

// Server setup
const app = express();
app.use(cookieParser());
app.use(express.json());

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
helpers.number({
    handlebars: hbs,
});
helpers.object({
    handlebars: hbs,
});

app.get("/", (req, res) => {
    return res.render("index.hbs", { config });
});
pages.forEach((page) =>
    app.get(new RegExp(`/(${page}$|${page}.html$)`, "i"), (req, res) => {
        return res.render(page + ".hbs", { config, countryList });
    })
);
app.get("*", (req, res) => res.redirect("/"));

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
