import { cosmic } from '@/lib/cosmic'
import { Shop, Category } from '@/types'
import ShopCard from '@/components/ShopCard'
import CategoryFilter from '@/components/CategoryFilter'

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

export default async function ShopsPage() {
  const shops = await getShops()
  const categories = await getCategories()
  const activeShops = shops.filter(shop => shop.metadata.is_active)
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          All Shops
        </h1>
        
        <div className="mb-8">
          <CategoryFilter categories={categories} />
        </div>
        
        {activeShops.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No shops available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}