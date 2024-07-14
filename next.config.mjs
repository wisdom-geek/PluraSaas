/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'img.clerk.com',
      'subdomain',
      'files.stripe.com',
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/site',
  //     },
  //   ];
  // },
};

export default nextConfig;