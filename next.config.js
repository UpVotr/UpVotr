const { i18n } = require("./next-i18next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    "process.env.NODE_ENV": process.env.NODE_ENV
  },
  i18n
};

module.exports = nextConfig;
