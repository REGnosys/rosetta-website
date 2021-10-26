const config = {
  env: process.env.ROSETTA_ENV || false,
  ga: process.env.ROSETTA_GA || "",
  gtm: process.env.ROSETTA_GTM || "",
  recaptcha_key: process.env.ROSETTA_RECAPTCHA_KEY || "",
  recaptcha_secret: process.env.ROSETTA_RECAPTCHA_SECRET || "",
  externalLinks: {
    issueTracking: "https://airtable.com/shrFPVYrrJ0QjlCX2",
    issueSubmit: "https://airtable.com/shrJM6FWeBbL4KrqO",
    status: "https://status.rosetta-technology.io",
    signIn: "https://ui.rosetta-technology.io/#/login",
    signUp: "https://ui.rosetta-technology.io/#/register",
    passwordReset: "https://ui.rosetta-technology.io/#/password-reset",
    regnosys: "https://www.regnosys.com",
    privacyPolicy: "#",
    terms: "#",
    documentation: "https://docs.rosetta-technology.io/dsl/index.html",
    coreDocumentation: "https://docs.rosetta-technology.io/core/",
    linkedIn: "https://www.linkedin.com/company/regnosys",
    twitter: "https://twitter.com/regnosys",
    domainModel:
      "https://olegchursin.medium.com/a-brief-introduction-to-domain-modeling-862a30b38353",
    cdmDocs: "https://www.isda.org/2018/11/22/isda-cdm-factsheet/",
    eclipse: "https://www.eclipse.org/modeling/emf/",
    isda: "https://www.isda.org/2019/10/14/isda-common-domain-model/",
    isla: "https://www.islaemea.org/regulation-and-policy/digital-fintech/common-domain-model-cdm/",
    icma: "https://www.icmagroup.org/News/news-in-brief/common-domain-model-cdm-for-repo-and-bonds/",
    ethereum:
      "https://axoni.com/press/axoni-and-regnosys-announce-scala-implementation-of-isda-common-domain-model/",
    corda:
      "https://mondovisione.com/media-and-resources/news/fragmos-chain-collaborates-with-isda-and-regnosys-to-deliver-kotlin-code-generat/",
    postTrade:
      "https://www.ey.com/en_gl/banking-capital-markets/how-financial-services-can-accelerate-the-adoption-of-the-isda-common-domain-model",
    regulatoryReporting:
      "https://jwg-it.eu/working-group/global-derivatives-digital-regulatory-reporting-programme/",
    machineExecutable: "https://www.bis.org/press/p201006.htm",
  },
};

exports.config = config;
