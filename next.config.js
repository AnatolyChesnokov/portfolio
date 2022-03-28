const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'imgix',
    path: 'https://anatoly-chesnokov.web.app/',
  },
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/featured': { page: '/featured' },
      '/hero': { page: '/hero' },
      '/jobs': { page: '/jobs' },
      '/projects': { page: '/projects' },
    };
  },
};

module.exports = withPlugins([[withFonts]], nextConfig);
