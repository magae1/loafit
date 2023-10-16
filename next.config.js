/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.lostark.co.kr",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
