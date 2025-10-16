import Link from 'next/link'

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Order from Your Favorite Local Shops
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Fresh products delivered to your doorstep with real-time tracking
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shops" className="btn-secondary">
              Browse Shops
            </Link>
            <Link href="/auth" className="btn-outline bg-white text-primary hover:bg-gray-100">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}