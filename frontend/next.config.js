const withFonts = require('next-fonts');
const pwa = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const isProd = process.env.NODE_ENV === 'production';
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    scrollRestoration: true,
  },
  webpack(config) {
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes('_app')) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
      process.env.NEXT_PUBLIC_WORDPRESS_IMAGES,
    ],
  },
};

const withFontsConfig = withFonts(nextConfig);

const withPWAConfig = pwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: !isProd,
  buildExcludes: [/middleware-manifest.json$/],
})(withFontsConfig);

module.exports = withPWAConfig;