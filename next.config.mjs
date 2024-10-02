/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    trailingSlash: true,
    sassOptions: {
        includePaths: ['./src']
    },
}

export default nextConfig;
