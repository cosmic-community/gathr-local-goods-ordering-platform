# Gathr — Local Goods Ordering Platform

![App Preview](https://imgix.cosmicjs.com/f3a2d2c0-aaa7-11f0-936e-dbe343b25d95-photo-1604719312566-8912e9227c6a-1760629875678.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive local goods ordering and delivery platform built with Next.js 15, Supabase, and Cosmic CMS. Gathr connects customers with nearby shops, enables real-time order tracking, and facilitates efficient delivery management.

## ✨ Features

- **Multi-Role Authentication**: Customer, Merchant, and Delivery personnel dashboards with Supabase Auth
- **Location-Based Shop Discovery**: Browse nearby shops within 5km radius using Google Maps API
- **Real-Time Order Tracking**: Live updates via Socket.IO for order status and delivery location
- **Flexible Payment Options**: Razorpay integration for online payments + Cash on Delivery
- **Merchant Dashboard**: Manage inventory, process orders, and view sales analytics
- **Delivery Management**: Smart assignment to nearest delivery personnel with route optimization
- **Cosmic CMS Integration**: Manage shops, products, and categories through Cosmic
- **Responsive Design**: Modern UI with warm, earthy tones optimized for all devices

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f112582ab74dc5fd67425a&clone_repository=68f117082ab74dc5fd67427d)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Project Name: Gathr — Local Goods Ordering and Delivery Platform
> 
> I want to generate a full-stack web app using the following tech stack and features:
> 
> ⚙️ Tech Stack
> 
> Frontend: Next.js (App Router) + Tailwind CSS + Redux Toolkit
> 
> Backend: Node.js (Express)
> 
> Database & Auth: Supabase (PostgreSQL + Supabase Auth)
> 
> Payment Gateway: Razorpay (India-based)
> 
> Maps: Google Maps API for delivery routing & distance filtering
> 
> Real-time Updates: Socket.IO
> 
> 👥 User Roles
> 
> Customer
> 
> Sign up / login via Supabase Auth (email/password or Google).
> 
> Browse nearby shops based on current location (Google Maps API).
> 
> Add products to cart, choose payment method (Razorpay or COD).
> 
> Track order status live (real-time updates via Socket.IO).
> 
> Get notifications when order is accepted, dispatched, or delivered.
> 
> Shopkeeper (Merchant)
> 
> Login via Supabase Auth (role = "merchant").
> 
> Create and manage shop details (location, contact, hours).
> 
> Add/edit/delete products (name, price, stock, category, image).
> 
> View incoming orders → Accept or reject.
> 
> See analytics: total sales, most sold items, pending orders.
> 
> Delivery Person
> 
> Login via Supabase Auth (role = "delivery").
> 
> Get assigned deliveries automatically (nearest first).
> 
> View pickup & drop-off locations on Google Maps.
> 
> Update delivery status → Picked up / On the way / Delivered.
> 
> For COD orders: confirm "cash in hand" on delivery.
> 
> 💸 Payments
> 
> Integrate Razorpay Checkout for online transactions.
> 
> Store transaction details in a payments table.
> 
> Handle Cash on Delivery (COD) by storing pending cash with delivery personnel.
> 
> Include payment webhooks in backend for status confirmation.
> 
> 📍 Maps Integration
> 
> Use Google Maps API to:
> 
> Show nearby shops within a 5km radius.
> 
> Show delivery route to customer for delivery personnel.
> 
> Enable live tracking (delivery updates via WebSocket).
> 
> 🗃️ Database Schema (Supabase Tables)
> 
> users → id, name, email, role (customer, merchant, delivery), phone
> 
> shops → id, owner_id, shop_name, location (lat, lng, address), contact
> 
> items → id, shop_id, name, price, quantity, category, image_url
> 
> carts → id, user_id, status (active/checked_out)
> 
> orders → id, customer_id, shop_id, delivery_id, address, status, payment_method, transaction_id, created_at
> 
> payments → id, order_id, amount, method, status, created_at
> 
> 🔐 Backend Functionality (Node + Supabase)
> 
> /api/auth/signup — Create Supabase user and role.
> 
> /api/auth/login — Generate session JWT.
> 
> /api/shops — CRUD for shops (merchant only).
> 
> /api/items — CRUD for shop products.
> 
> /api/orders — Place, update, or track orders.
> 
> /api/delivery — Assign nearest delivery person and update delivery status.
> 
> /api/payment/verify — Razorpay webhook verification.
> 
> /api/location/nearby-shops — Return shops within user's GPS radius.
> 
> 🎨 Frontend (Next.js) Pages
> 
> / → Landing page with nearby shops.
> 
> /auth → Login/Signup page (Supabase Auth).
> 
> /customer/dashboard → Orders, cart, live tracking map.
> 
> /merchant/dashboard → Orders, inventory, analytics.
> 
> /delivery/dashboard → Assigned deliveries, map navigation.
> 
> /checkout → Razorpay integration and order summary.
> 
> 💬 Real-Time Events (Socket.IO)
> 
> "order:update" → Notify all parties about order status change.
> 
> "delivery:location" → Stream delivery person's live location.
> 
> "chat:message" → Optional in-room communication between merchant and delivery.
> 
> 🎨 UI Guidelines
> 
> Modern, clean design (no neon colors).
> 
> Use warm and earthy tones to give a local-commerce vibe (e.g. beige, deep green, amber).
> 
> Dashboard-style layouts for each role.
> 
> Consistent color coding for order statuses:
> 
> Pending = Yellow
> 
> Confirmed = Blue
> 
> Out for Delivery = Orange
> 
> Delivered = Green
> 
> Cancelled = Red
> 
> 🧠 Expected Output
> 
> Generate:
> 
> Full folder structure for Next.js + Express backend.
> 
> Sample Supabase schema and migrations.
> 
> API route examples (Express + Supabase).
> 
> Razorpay payment flow code.
> 
> Map integration (Google Maps JS API + React hooks).
> 
> Figma-style UI wireframe ideas for Customer, Merchant, and Delivery dashboards.
> 
> Make the project production-ready, scalable for at least 1000 concurrent users, and use environment variables for all API keys (Supabase, Google Maps, Razorpay)."

### Code Generation Prompt

> "Based on the content model I created for Gathr — Local Goods Ordering and Delivery Platform, now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom warm color palette
- **CMS**: Cosmic for shop, product, and category management
- **Authentication**: Supabase Auth with role-based access control
- **Database**: Supabase (PostgreSQL)
- **Payments**: Razorpay integration for online payments
- **Maps**: Google Maps JavaScript API
- **Real-time**: Socket.IO for live updates
- **State Management**: Redux Toolkit
- **Image Optimization**: Imgix via Cosmic CDN

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and Bun package manager
- Cosmic account with bucket access
- Supabase project with database
- Razorpay account for payments
- Google Maps API key

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables (see below)
4. Run database migrations (Supabase)
5. Start the development server:

```bash
bun run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Cosmic CMS (automatically provided)
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Socket.IO Server
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## 📚 Cosmic SDK Examples

### Fetching Shops with Location Data

```typescript
import { cosmic } from '@/lib/cosmic'

async function getNearbyShops(lat: number, lng: number, radiusKm: number = 5) {
  try {
    const response = await cosmic.objects
      .find({ type: 'shops' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const shops = response.objects as Shop[]
    
    // Filter shops within radius
    return shops.filter(shop => {
      const distance = calculateDistance(
        lat, lng,
        shop.metadata.latitude,
        shop.metadata.longitude
      )
      return distance <= radiusKm && shop.metadata.is_active
    })
  } catch (error) {
    console.error('Error fetching shops:', error)
    return []
  }
}
```

### Fetching Products by Shop

```typescript
async function getProductsByShop(shopId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.shop': shopId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Product[]
  } catch (error) {
    if (error.status === 404) return []
    throw error
  }
}
```

## 🗄️ Cosmic CMS Integration

This application uses Cosmic CMS to manage:

- **Shops**: Store information, location coordinates, operating hours
- **Products**: Inventory with pricing, stock quantities, and images
- **Categories**: Product and shop categorization with icons

The content model includes:
- Shop location data (latitude, longitude) for GPS-based filtering
- Product metadata including pricing, stock, and availability status
- Category relationships for organizing shops and products
- File metafields for product and shop images

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Database Setup (Supabase)

Run the included migration scripts to create necessary tables:

```sql
-- See supabase/migrations/001_initial_schema.sql
```

### Socket.IO Server

Deploy the Socket.IO server separately (Railway, Heroku, or DigitalOcean):

```bash
cd socket-server
bun install
bun run start
```

## 📱 Application Structure

- `/` - Landing page with nearby shops
- `/auth` - Login/signup with role selection
- `/customer/dashboard` - Customer orders and cart
- `/merchant/dashboard` - Merchant order management
- `/delivery/dashboard` - Delivery personnel assignments
- `/shops/[slug]` - Individual shop pages
- `/products/[slug]` - Product detail pages
- `/checkout` - Order checkout with payment

## 🔒 Security Features

- Role-based access control via Supabase Auth
- Row-level security policies in Supabase
- Secure API routes with middleware authentication
- Razorpay webhook signature verification
- Environment variable protection

## 📄 License

MIT License - feel free to use this project for your own local commerce platform!

<!-- README_END -->