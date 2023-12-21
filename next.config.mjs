/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path',
        destination: '/api/auth/:path*',
      },
      {
        source: '/api/image_upload/:path',
        destination: '/api/image_upload/:path*',
      },
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_BASE_URL+'/api/:path*',
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com","lh3.googleusercontent.com","s.gravatar.com"]
    
  },
}


export default nextConfig
