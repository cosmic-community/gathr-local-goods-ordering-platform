import Link from 'next/link'
import { Shop } from '@/types'

export default function ShopCard({ shop }: { shop: Shop }) {
  const category = shop.metadata.shop_category
  
  return (
    <Link href={`/shops/${shop.slug}`} className="card hover:shadow-lg transition-shadow duration-200">
      {shop.metadata.featured_image && (
        <div className="mb-4 -mx-6 -mt-6 rounded-t-lg overflow-hidden">
          <img
            src={`${shop.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
            alt={shop.title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-900">{shop.title}</h3>
        {category && category.metadata.icon && (
          <span className="text-2xl">{category.metadata.icon}</span>
        )}
      </div>
      
      {shop.metadata.description && (
        <p className="text-gray-600 mb-3 line-clamp-2">
          {shop.metadata.description}
        </p>
      )}
      
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{shop.metadata.location_address}</span>
        </div>
        
        {shop.metadata.operating_hours && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{shop.metadata.operating_hours}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>{shop.metadata.contact_phone}</span>
        </div>
      </div>
      
      {category && (
        <div className="mt-4 pt-4 border-t">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-light text-white rounded-full text-xs">
            {category.metadata.icon} {category.metadata.category_name}
          </span>
        </div>
      )}
    </Link>
  )
}