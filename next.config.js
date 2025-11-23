/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/연애상담',
        destination: '/relationship',
      },
      {
        source: '/재회상담',
        destination: '/reunion',
      },
      {
        source: '/%EC%97%B0%EC%95%A0%EC%83%81%EB%8B%B4', // URL encoded version just in case
        destination: '/relationship',
      },
      {
        source: '/%EC%9E%AC%ED%9A%8C%EC%83%81%EB%8B%B4', // URL encoded version just in case
        destination: '/reunion',
      },
    ]
  },
}

module.exports = nextConfig
