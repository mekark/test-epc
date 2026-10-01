import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inline the CSS into the HTML so it no longer blocks first render.
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
