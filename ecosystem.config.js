module.exports = [
  {
    script: "server/index.js",
    name: "rosetta-website",
    exec_mode: "cluster",
    autorestart: true,
    instances: 0,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
  },
];
