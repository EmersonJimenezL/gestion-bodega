/** @type {import('next').NextConfig} */
const nextConfig = {
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
