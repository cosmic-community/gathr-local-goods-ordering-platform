import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { supabase } from '@/lib/supabase'
import { CartState, Cart, CartItem } from '@/types'

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
}

export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async (userId: string) => {
    const { data: cart, error } = await supabase()
      .from('carts')
      .select('*, items:cart_items(*)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    
    if (!cart) {
      // Create new cart
      const { data: newCart, error: createError } = await supabase()
        .from('carts')
        .insert({ user_id: userId, status: 'active' })
        .select('*, items:cart_items(*)')
        .single()
      
      if (createError) throw createError
      return newCart as Cart
    }
    
    return cart as Cart
  }
)

export const addToCart = createAsyncThunk(
  'cart/addItem',
  async ({ 
    cartId, 
    productId, 
    shopId, 
    quantity, 
    price 
  }: { 
    cartId: string
    productId: string
    shopId: string
    quantity: number
    price: number
  }) => {
    // Check if item already exists
    const { data: existingItem } = await supabase()
      .from('cart_items')
      .select('*')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .single()
    
    if (existingItem) {
      // Update quantity
      const { data, error } = await supabase()
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single()
      
      if (error) throw error
      return data as CartItem
    } else {
      // Add new item
      const { data, error } = await supabase()
        .from('cart_items')
        .insert({
          cart_id: cartId,
          product_id: productId,
          shop_id: shopId,
          quantity,
          price,
        })
        .select()
        .single()
      
      if (error) throw error
      return data as CartItem
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (itemId: string) => {
    const { error } = await supabase()
      .from('cart_items')
      .delete()
      .eq('id', itemId)
    
    if (error) throw error
    return itemId
  }
)

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
    const { data, error } = await supabase()
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select()
      .single()
    
    if (error) throw error
    return data as CartItem
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch cart'
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (state.cart) {
          const existingIndex = state.cart.items.findIndex(
            item => item.product_id === action.payload.product_id
          )
          if (existingIndex >= 0) {
            state.cart.items[existingIndex] = action.payload
          } else {
            state.cart.items.push(action.payload)
          }
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.items = state.cart.items.filter(
            item => item.id !== action.payload
          )
        }
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        if (state.cart) {
          const index = state.cart.items.findIndex(
            item => item.id === action.payload.id
          )
          if (index >= 0) {
            state.cart.items[index] = action.payload
          }
        }
      })
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer