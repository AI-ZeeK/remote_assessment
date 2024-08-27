/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "assessment-yjv4.onrender.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assessment-yjv4.onrender.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
