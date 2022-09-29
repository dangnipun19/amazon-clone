/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["www.nicepng.com",'fakestoreapi.com','links.papareact.com']
  },

  env:{
    stripe_public_key:process.env.STRIPE_PUBLIC_KEY
  }
}

module.exports = nextConfig
