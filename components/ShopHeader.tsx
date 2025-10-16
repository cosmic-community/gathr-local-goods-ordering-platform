import { Shop } from '@/types'

export default function ShopHeader({ shop }: { shop: Shop }) {
  const category = shop.metadata.shop_category
  
  return (
    <div className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {shop.metadata.featured_image && (
            <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={`${shop.metadata.featured_image.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
                alt={shop.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-3xl font-bold">{shop.title}</h1>
              {category && category.metadata.icon && (
                <span className="text-3xl">{category.metadata.icon}</span>
              )}
            </div>
            
            {shop.metadata.description && (
              <p className="text-lg opacity-90 mb-4">
                {shop.metadata.description}
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{shop.metadata.location_address}</span>
              </div>
              
              {shop.metadata.operating_hours && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{shop.metadata.operating_hours}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{shop.metadata.contact_phone}</span>
              </div>
              
              {category && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white bg-opacity-20 rounded-full">
                    {category.metadata.icon} {category.metadata.category_name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}