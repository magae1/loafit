/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.lostark.co.kr",
        port: "",
      },
      { protocol: "https", hostname: "cdn-lostark.game.onstove.com", port: "" },
    ],
  },
};

module.exports = nextConfig;
