import Link from 'next/link'
import { cosmic } from '@/lib/cosmic'
import { Shop, Category } from '@/types'
import ShopCard from '@/components/ShopCard'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'

async function getShops(): Promise<Shop[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'shops' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Shop[]
  } catch (error) {
    console.error('Error fetching shops:', error)
    return []
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Category[]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function HomePage() {
  const shops = await getShops()
  const categories = await getCategories()
  const activeShops = shops.filter(shop => shop.metadata.is_active)
  
  return (
    <div className="min-h-screen">
      <Hero />
      
      <main className="container mx-auto px-4 py-8">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse by Category
          </h2>
          <CategoryFilter categories={categories} />
        </section>
        
        {/* Shops */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Nearby Shops ({activeShops.length})
            </h2>
            <Link 
              href="/shops" 
              className="text-primary hover:text-primary-dark font-medium"
            >
              View All →
            </Link>
          </div>
          
          {activeShops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No active shops available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeShops.slice(0, 6).map(shop => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          )}
        </section>
        
        {/* CTA Section */}
        <section className="mt-16 bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Create an account and start ordering from your favorite local shops
          </p>
          <Link href="/auth" className="btn-secondary inline-block">
            Get Started
          </Link>
        </section>
      </main>
    </div>
  )
}