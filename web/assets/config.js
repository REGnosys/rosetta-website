const config = {
  prod: false,
  ga: process.env.ROSETTA_GA,
  gtm: process.env.ROSETTA_GTM,
  captcha:
    process.env.ROSETTA_CAPTCHA || "6LfCIeIcAAAAAKgTKA9QGstV6kusnO3mD29SWspz", // Default dev site key
};

exports.config = config;
