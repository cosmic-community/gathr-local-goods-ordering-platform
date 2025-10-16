import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { Shop } from '@/types'
import { calculateDistance } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lng = parseFloat(searchParams.get('lng') || '0')
    const radius = parseFloat(searchParams.get('radius') || '5')
    
    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Missing latitude or longitude' },
        { status: 400 }
      )
    }
    
    // Fetch all shops from Cosmic
    const response = await cosmic.objects
      .find({ type: 'shops' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const shops = response.objects as Shop[]
    
    // Filter shops by distance and active status
    const nearbyShops = shops
      .filter(shop => {
        const distance = calculateDistance(
          lat,
          lng,
          shop.metadata.latitude,
          shop.metadata.longitude
        )
        return distance <= radius && shop.metadata.is_active
      })
      .map(shop => {
        const distance = calculateDistance(
          lat,
          lng,
          shop.metadata.latitude,
          shop.metadata.longitude
        )
        return {
          ...shop,
          distance,
        }
      })
      .sort((a, b) => a.distance - b.distance)
    
    return NextResponse.json({ shops: nearbyShops })
  } catch (error) {
    console.error('Nearby shops error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch nearby shops' },
      { status: 500 }
    )
  }
}