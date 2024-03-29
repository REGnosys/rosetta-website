const hash = require("../web/assets/js/build-hash.json").hash;

const config = {
    hash: hash,
    env: process.env.ROSETTA_ENV || false,
    isProd: process.env.ROSETTA_ENV === "prod",
    ga: process.env.ROSETTA_GA || "",
    gtm: process.env.ROSETTA_GTM || "",
    public: {
        recaptcha_key:
            process.env.ROSETTA_RECAPTCHA_KEY || "6LfCIeIcAAAAAKgTKA9QGstV6kusnO3mD29SWspz",
        hs_portal_id: "4975376",
        hs_form_guid: "5ea128f0-9a63-4904-b293-7ba62aa31d08",
    },
    externalLinks: {
        issueTracking: "https://airtable.com/shrFPVYrrJ0QjlCX2",
        issueSubmit: "https://airtable.com/shrJM6FWeBbL4KrqO",
        status: "https://status.rosetta-technology.io",
        signIn: "https://ui.rosetta-technology.io/#/login",
        signUp: "https://ui.rosetta-technology.io/#/register",
        passwordReset: "https://ui.rosetta-technology.io/#/password-reset",
        regnosys: "https://www.regnosys.com",
        documentation: "https://docs.rosetta-technology.io/rosetta/rosetta-dsl",
        coreDocumentation: "https://docs.rosetta-technology.io",
        faq: "https://docs.rosetta-technology.io/rosetta/faq",
        linkedIn: "https://www.linkedin.com/company/regnosys",
        twitter: "https://twitter.com/regnosys",
        termsOfUse: "https://regnosys.com/regnosys-terms-of-use",
        privacyStatement: "https://regnosys.com/regnosys-privacy-statement",
        cookiePolicy: "https://regnosys.com/regnosys-privacy-statement/#cookie-policy",
        domainModel:
            "https://olegchursin.medium.com/a-brief-introduction-to-domain-modeling-862a30b38353",
        cdmDocs: "https://www.isda.org/2018/11/22/isda-cdm-factsheet",
        eclipse: "https://www.eclipse.org/modeling/emf",
        isda: "https://www.isda.org/2019/10/14/isda-common-domain-model",
        isdaCreate:
            "https://www.isda.org/2021/10/21/common-domain-model-integrated-into-isda-create",
        isla: "https://www.islaemea.org/regulation-and-policy/digital-fintech/common-domain-model-cdm",
        icma: "https://www.icmagroup.org/News/news-in-brief/common-domain-model-cdm-for-repo-and-bonds",
        ethereum:
            "https://axoni.com/press/axoni-and-regnosys-announce-scala-implementation-of-isda-common-domain-model",
        corda: "https://www.regnosys.com/fragmos-chain-collaborates-with-isda-and-regnosys-to-deliver-cdm-in-kotlin",
        postTrade:
            "https://www.ey.com/en_gl/banking-capital-markets/how-financial-services-can-accelerate-the-adoption-of-the-isda-common-domain-model",
        regulatoryReporting:
            "https://jwg-it.eu/working-group/global-derivatives-digital-regulatory-reporting-programme",
        machineExecutable: "https://www.bis.org/press/p201006.htm",
        dataModelling:
            "https://ellipse.bisih.org/proof-of-concept/demonstration-of-the-mortgage-cdm",
    },
    metrics: {
        users: 1000,
        markets: 80,
        languages: 7,
    },
    pricing: {
        community: {
            yearly: {
                amount: "",
            },
            monthly: {
                amount: "",
            },
            api: {
                limit: 500,
                amountPerRequest: false,
            },
            workspaceLimit: 3,
        },
        essentials: {
            yearly: {
                amount: 417,
            },
            monthly: {
                amount: 500,
            },
            api: {
                limit: 1000,
                amountPerRequest: false,
            },
            workspaceLimit: 5,
        },
        pro: {
            yearly: {
                amount: 1334,
            },
            monthly: {
                amount: 1600,
            },
            api: {
                limit: 1000,
                amountPerRequest: 0.01,
            },
            workspaceLimit: 10,
        },
        enterprise: {
            yearly: {
                amount: 2000,
            },
            monthly: {
                amount: 2400,
            },
            api: {
                limit: 10000,
                amountPerRequest: 0.01,
            },
            workspaceLimit: 50,
        },
    },
};

module.exports = config;
