// app/shops/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { cosmic } from '@/lib/cosmic'
import { Shop, Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import ShopHeader from '@/components/ShopHeader'

async function getShop(slug: string): Promise<Shop | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'shops', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Shop
  } catch (error) {
    console.error('Error fetching shop:', error)
    return null
  }
}

async function getShopProducts(shopId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.shop': shopId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Product[]
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const shop = await getShop(slug)
  
  if (!shop) {
    notFound()
  }
  
  const products = await getShopProducts(shop.id)
  const inStockProducts = products.filter(p => p.metadata.in_stock)
  
  return (
    <div className="min-h-screen bg-background">
      <ShopHeader shop={shop} />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Available Products ({inStockProducts.length})
        </h2>
        
        {inStockProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {inStockProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}