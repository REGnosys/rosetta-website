const express = require("express");
const path = require("path");
const hbs = require("hbs");
const sgMail = require("@sendgrid/mail");
const axios = require("axios");
const countries = require("country-data-list").countries;
const config = require("./config.js");

const PORT = process.env.PORT || 5000;
const RECAPTCHA_SECRET_KEY = process.env.ROSETTA_RECAPTCHA_SECRET || "";
const SENDGRID_API_KEY = process.env.ROSETTA_SENDGRID_API_KEY || "";
const SCORE_THRESHOLD = 0.5;
const MAIL_TO = process.env.ROSETTA_MAIL_TO;

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

const sendEmail = (formData) => {
  if (!MAIL_TO) {
    console.log('To mail to recipient not defined!');
    return Promise.resolve();
  }

  const msg = {
    to: MAIL_TO,
    from: `${formData.firstName} ${formData.surname} <${formData.email}>`,
    subject: "Rosetta Website Query",
    html: `
      <p>${formData.message}</p>
      <p>
        Website: ${formData.website} </br >
        Phone: <a href="tel:${formData.phone}">${formData.phone}</a> </br >
        Country: ${formData.country} </br >
      </p>
    `,
  };

  return sgMail.send(msg);
};

const handleSend = (req, res) => {
  if (!RECAPTCHA_SECRET_KEY) {
    throw new Error("No secret key set!");
  }

  const formData = req.body;

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${formData.token}`;
  axios.post(url)
    .then((googleResponse) => {
      const data = googleResponse.data;

      if (!data.success) {
        throw new Error(data["error-codes"]);
      }

      if (data.score < SCORE_THRESHOLD) {
        throw new Error("You are not human!")
      }

      return sendEmail(formData);
    })
    .then(() => res.status(200).send({message: 'Email send successfully'}))
    .catch((error) => res.json({ error }));
};

// Email setup
sgMail.setApiKey(SENDGRID_API_KEY);

// Server setup
const app = express();
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
