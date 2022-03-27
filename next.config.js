const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true
}

module.exports = withPlugins([[withFonts]], nextConfig)
