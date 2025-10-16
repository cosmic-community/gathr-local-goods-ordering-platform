// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cosmic } from '@/lib/cosmic'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import AddToCartButton from '@/components/AddToCartButton'

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    notFound()
  }
  
  const shop = product.metadata.shop
  const category = product.metadata.category
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-surface rounded-lg overflow-hidden">
              {product.metadata.product_image ? (
                <img
                  src={`${product.metadata.product_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col">
              {/* Category Badge */}
              {category && (
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-light text-white rounded-full text-sm">
                    {category.metadata.icon} {category.metadata.category_name}
                  </span>
                </div>
              )}
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              {product.metadata.description && (
                <p className="text-gray-600 mb-6">
                  {product.metadata.description}
                </p>
              )}
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.metadata.price)}
                </span>
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                {product.metadata.in_stock ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">In Stock ({product.metadata.stock_quantity} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              
              {/* Add to Cart */}
              {product.metadata.in_stock && (
                <div className="mb-6">
                  <AddToCartButton product={product} />
                </div>
              )}
              
              {/* Shop Info */}
              {shop && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Sold by
                  </h3>
                  <Link 
                    href={`/shops/${shop.slug}`}
                    className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  >
                    {shop.metadata.featured_image && (
                      <img
                        src={`${shop.metadata.featured_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={shop.title}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{shop.title}</p>
                      <p className="text-sm text-gray-600">
                        {shop.metadata.location_address}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}