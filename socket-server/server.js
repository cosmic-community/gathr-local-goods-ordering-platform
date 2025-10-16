import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

const io = new Server(3001, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

// Store active connections
const users = new Map()
const deliveryPersonnel = new Map()

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  // User authentication
  socket.on('authenticate', (data) => {
    const { userId, role } = data
    users.set(userId, socket.id)
    
    if (role === 'delivery') {
      deliveryPersonnel.set(userId, socket.id)
    }
    
    console.log(`User ${userId} authenticated as ${role}`)
  })
  
  // Join order room
  socket.on('join-order', (orderId) => {
    socket.join(`order-${orderId}`)
    console.log(`Socket ${socket.id} joined order ${orderId}`)
  })
  
  // Order status update
  socket.on('order:update', (data) => {
    const { orderId, status, updatedBy } = data
    
    // Broadcast to all users in the order room
    io.to(`order-${orderId}`).emit('order:update', {
      orderId,
      status,
      updatedBy,
      timestamp: new Date().toISOString()
    })
    
    console.log(`Order ${orderId} status updated to ${status}`)
  })
  
  // Delivery location update
  socket.on('delivery:location', (data) => {
    const { orderId, location } = data
    
    // Broadcast to all users tracking this order
    io.to(`order-${orderId}`).emit('delivery:location', {
      orderId,
      location,
      timestamp: new Date().toISOString()
    })
  })
  
  // Chat message
  socket.on('chat:message', (data) => {
    const { orderId, message, from } = data
    
    // Broadcast to all users in the order room
    io.to(`order-${orderId}`).emit('chat:message', {
      orderId,
      message,
      from,
      timestamp: new Date().toISOString()
    })
  })
  
  // Assign delivery
  socket.on('delivery:assign', (data) => {
    const { deliveryId, orderId } = data
    
    const deliverySocketId = deliveryPersonnel.get(deliveryId)
    if (deliverySocketId) {
      io.to(deliverySocketId).emit('delivery:assigned', {
        orderId,
        timestamp: new Date().toISOString()
      })
      
      console.log(`Order ${orderId} assigned to delivery ${deliveryId}`)
    }
  })
  
  // Disconnect
  socket.on('disconnect', () => {
    // Remove user from maps
    for (const [userId, socketId] of users.entries()) {
      if (socketId === socket.id) {
        users.delete(userId)
        deliveryPersonnel.delete(userId)
        break
      }
    }
    
    console.log('User disconnected:', socket.id)
  })
})

console.log('Socket.IO server running on port 3001')