/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePath: [path.join(__dirname, 'styles')],
    prependData: `@import './base.scss';`,
  },
};

module.exports = nextConfig;
