import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types'

type OrderInsert = Database['public']['Tables']['orders']['Insert']
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']
type PaymentInsert = Database['public']['Tables']['payments']['Insert']

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    
    // Validate required fields
    if (!orderData.customer_id || !orderData.shop_id || !orderData.delivery_address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create order with proper typing
    const orderInsert: OrderInsert = {
      customer_id: orderData.customer_id,
      shop_id: orderData.shop_id,
      delivery_address: orderData.delivery_address,
      delivery_lat: orderData.delivery_lat,
      delivery_lng: orderData.delivery_lng,
      payment_method: orderData.payment_method,
      total_amount: orderData.total_amount,
      status: 'pending',
    }
    
    const { data: order, error: orderError } = await supabase()
      .from('orders')
      .insert(orderInsert)
      .select()
      .single()
    
    if (orderError) {
      return NextResponse.json(
        { error: orderError.message },
        { status: 400 }
      )
    }
    
    // Create order items
    if (orderData.items && orderData.items.length > 0) {
      const orderItems: OrderItemInsert[] = orderData.items.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.price,
      }))
      
      const { error: itemsError } = await supabase()
        .from('order_items')
        .insert(orderItems)
      
      if (itemsError) {
        console.error('Error creating order items:', itemsError)
      }
    }
    
    // Create payment record with proper typing
    const paymentInsert: PaymentInsert = {
      order_id: order.id,
      amount: orderData.total_amount,
      method: orderData.payment_method,
      status: 'pending',
    }
    
    const { error: paymentError } = await supabase()
      .from('payments')
      .insert(paymentInsert)
    
    if (paymentError) {
      console.error('Error creating payment record:', paymentError)
    }
    
    return NextResponse.json({ order })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customer_id')
    const deliveryId = searchParams.get('delivery_id')
    
    let query = supabase()
      .from('orders')
      .select('*, items:order_items(*)')
      .order('created_at', { ascending: false })
    
    if (customerId) {
      query = query.eq('customer_id', customerId)
    }
    
    if (deliveryId) {
      query = query.eq('delivery_id', deliveryId)
    }
    
    const { data, error } = await query
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ orders: data })
  } catch (error) {
    console.error('Fetch orders error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}