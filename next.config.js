const withMDX = require("@next/mdx")({ extension: /\.mdx?$/ });

const nextConfig = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  redirects: async () => [
    {
      source: "/music",
      destination: "/music/calendar",
      permanent: true,
    },
  ],
});

module.exports = nextConfig;
