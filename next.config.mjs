/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/inicio-sesion",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
