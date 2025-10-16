'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '@/types'
import { addToCart } from '@/store/slices/cartSlice'
import { RootState, AppDispatch } from '@/store/store'

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { cart } = useSelector((state: RootState) => state.cart)
  const { user } = useSelector((state: RootState) => state.auth)
  
  const handleAddToCart = async () => {
    if (!user) {
      alert('Please sign in to add items to cart')
      return
    }
    
    if (!cart) {
      alert('Cart not initialized')
      return
    }
    
    if (!product.metadata.shop) {
      alert('Product shop information missing')
      return
    }
    
    setIsAdding(true)
    
    try {
      await dispatch(addToCart({
        cartId: cart.id,
        productId: product.id,
        shopId: product.metadata.shop.id,
        quantity,
        price: product.metadata.price,
      })).unwrap()
      
      alert('Added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add to cart')
    } finally {
      setIsAdding(false)
    }
  }
  
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
        >
          -
        </button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity(Math.min(product.metadata.stock_quantity, quantity + 1))}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
        >
          +
        </button>
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="btn-primary flex-1"
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  )
}