import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inline the CSS into the HTML so it no longer blocks first render.
  experimental: {
    inlineCss: true,
  },
  images: { qualities: [50, 75] },
  // Drop Next's built-in legacy polyfills (Array.prototype.at/flat, Object.hasOwn, ...).
  // Safe because browserslist targets modern browsers only.
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./lib-empty-polyfill.js",
      "next/dist/build/polyfills/polyfill-module": "./lib-empty-polyfill.js",
    },
  },
};

export default nextConfig;
