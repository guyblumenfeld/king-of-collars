/** @type {import('next').NextConfig} */
const WP = process.env.NEXT_PUBLIC_WP_ORIGIN || "https://lightgreen-buffalo-540924.hostingersite.com";

const nextConfig = {
  output: "export", // static export for Hostinger (PHP/Apache host, no Node)
  images: { unoptimized: true }, // no Node image optimizer on static export
  trailingSlash: true,
  // Dev-only proxy so the browser treats cart calls as same-origin (avoids CORS in local testing).
  // Rewrites are ignored by `output: export`, so they only apply during `next dev`.
  async rewrites() {
    return [{ source: "/wpapi/:path*", destination: `${WP}/wp-json/:path*` }];
  },
};

module.exports = nextConfig;
