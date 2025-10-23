/** @type {import('next').NextConfig} */
const nextConfig = {xz
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: process.env.NEXT_PUBLIC_API_URL +"/:path*", // proxy vers ton backend
            },
        ];
    },
};

export default nextConfig;
