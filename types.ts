// Cosmic object type definitions

export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    category_name: string
    description?: string
    icon?: string
  }
}

export interface Shop extends CosmicObject {
  type: 'shops'
  metadata: {
    shop_name: string
    description?: string
    location_address: string
    latitude: number
    longitude: number
    contact_phone: string
    operating_hours?: string
    shop_category?: Category
    featured_image?: {
      url: string
      imgix_url: string
    }
    is_active: boolean
  }
}

export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    product_name: string
    description?: string
    price: number
    stock_quantity: number
    category?: Category
    shop?: Shop
    product_image?: {
      url: string
      imgix_url: string
    }
    in_stock: boolean
  }
}

// Supabase database types
export interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'merchant' | 'delivery'
  phone?: string
  created_at: string
}

export interface CartItem {
  id: string
  cart_id: string
  product_id: string
  shop_id: string
  quantity: number
  price: number
}

export interface Cart {
  id: string
  user_id: string
  status: 'active' | 'checked_out'
  items: CartItem[]
  created_at: string
  updated_at: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'
export type PaymentMethod = 'razorpay' | 'cod'
export type PaymentStatus = 'pending' | 'completed' | 'failed'

export interface Order {
  id: string
  customer_id: string
  shop_id: string
  delivery_id?: string
  delivery_address: string
  delivery_lat: number
  delivery_lng: number
  status: OrderStatus
  payment_method: PaymentMethod
  transaction_id?: string
  total_amount: number
  items: CartItem[]
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  order_id: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  razorpay_payment_id?: string
  razorpay_order_id?: string
  created_at: string
}

// Redux state types
export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface CartState {
  cart: Cart | null
  loading: boolean
  error: string | null
}

export interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  loading: boolean
  error: string | null
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}

// Location types
export interface Location {
  lat: number
  lng: number
}

export interface NearbyShopResult extends Shop {
  distance: number
}

// Supabase Database Schema Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'customer' | 'merchant' | 'delivery'
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role: 'customer' | 'merchant' | 'delivery'
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          name?: string
          role?: 'customer' | 'merchant' | 'delivery'
          phone?: string | null
          updated_at?: string
        }
      }
      carts: {
        Row: {
          id: string
          user_id: string
          status: 'active' | 'checked_out'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'active' | 'checked_out'
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'active' | 'checked_out'
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string
          shop_id: string
          quantity: number
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cart_id: string
          product_id: string
          shop_id: string
          quantity: number
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          quantity?: number
          price?: number
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          shop_id: string
          delivery_id: string | null
          delivery_address: string
          delivery_lat: number
          delivery_lng: number
          status: OrderStatus
          payment_method: PaymentMethod
          transaction_id: string | null
          total_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          shop_id: string
          delivery_id?: string | null
          delivery_address: string
          delivery_lat: number
          delivery_lng: number
          status?: OrderStatus
          payment_method: PaymentMethod
          transaction_id?: string | null
          total_amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          delivery_id?: string | null
          delivery_address?: string
          delivery_lat?: number
          delivery_lng?: number
          status?: OrderStatus
          payment_method?: PaymentMethod
          transaction_id?: string | null
          total_amount?: number
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          product_name: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          product_name: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          quantity?: number
          price?: number
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          amount: number
          method: PaymentMethod
          status: PaymentStatus
          razorpay_payment_id: string | null
          razorpay_order_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          amount: number
          method: PaymentMethod
          status?: PaymentStatus
          razorpay_payment_id?: string | null
          razorpay_order_id?: string | null
          created_at?: string
        }
        Update: {
          amount?: number
          method?: PaymentMethod
          status?: PaymentStatus
          razorpay_payment_id?: string | null
          razorpay_order_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}