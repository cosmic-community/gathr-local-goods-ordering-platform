import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

export default function ProductCard({ product }: { product: Product }) {
  const category = product.metadata.category
  
  return (
    <Link href={`/products/${product.slug}`} className="card hover:shadow-lg transition-shadow duration-200">
      {product.metadata.product_image && (
        <div className="mb-4 -mx-6 -mt-6 rounded-t-lg overflow-hidden">
          <img
            src={`${product.metadata.product_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      
      {category && (
        <div className="mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-light text-white rounded-full text-xs">
            {category.metadata.icon} {category.metadata.category_name}
          </span>
        </div>
      )}
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {product.title}
      </h3>
      
      {product.metadata.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.metadata.description}
        </p>
      )}
      
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">
          {formatPrice(product.metadata.price)}
        </span>
        
        {product.metadata.in_stock ? (
          <span className="text-green-600 text-sm font-medium">
            In Stock
          </span>
        ) : (
          <span className="text-red-600 text-sm font-medium">
            Out of Stock
          </span>
        )}
      </div>
      
      {product.metadata.in_stock && (
        <div className="mt-3 text-sm text-gray-600">
          {product.metadata.stock_quantity} units available
        </div>
      )}
    </Link>
  )
}