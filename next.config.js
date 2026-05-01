/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Allow images from GitHub avatars if needed
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "github.com",
            },
        ],
    },
};

module.exports = nextConfig;
