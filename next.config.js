module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  reactStrictMode: true,
  images: {
    domains: [
      'themes.3rdwavemedia.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/about',
      },
    ]
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
  //     config.node = {
  //       fs: 'empty'
  //     }
  //   }
  //
  //   return config;
  // }
}
