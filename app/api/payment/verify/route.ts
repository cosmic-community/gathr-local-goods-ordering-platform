import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types'

type PaymentUpdate = Database['public']['Tables']['payments']['Update']
type OrderUpdate = Database['public']['Tables']['orders']['Update']

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id,
    } = await request.json()
    
    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')
    
    const isValid = expectedSignature === razorpay_signature
    
    if (isValid) {
      // Update payment status with proper typing
      const paymentUpdate: PaymentUpdate = {
        status: 'completed',
        razorpay_payment_id,
        razorpay_order_id,
      }
      
      await supabase()
        .from('payments')
        .update(paymentUpdate)
        .eq('order_id', order_id)
      
      // Update order status with proper typing
      const orderUpdate: OrderUpdate = {
        status: 'confirmed',
        transaction_id: razorpay_payment_id,
      }
      
      await supabase()
        .from('orders')
        .update(orderUpdate)
        .eq('id', order_id)
      
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}