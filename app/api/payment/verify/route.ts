import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabase } from '@/lib/supabase'

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
      // Update payment status
      await supabase
        .from('payments')
        .update({
          status: 'completed',
          razorpay_payment_id,
          razorpay_order_id,
        })
        .eq('order_id', order_id)
      
      // Update order status
      await supabase
        .from('orders')
        .update({
          status: 'confirmed',
          transaction_id: razorpay_payment_id,
        })
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