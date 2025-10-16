import { Category } from '@/types'

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) {
    return null
  }
  
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map(category => (
        <button
          key={category.id}
          className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-primary hover:text-white rounded-full border border-gray-200 transition-all duration-200"
        >
          {category.metadata.icon && (
            <span className="text-xl">{category.metadata.icon}</span>
          )}
          <span className="font-medium">{category.metadata.category_name}</span>
        </button>
      ))}
    </div>
  )
}