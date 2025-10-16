import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      autoConnect: false,
    })
  }
  return socket
}

export function connectSocket(userId: string) {
  const socketInstance = getSocket()
  
  if (!socketInstance.connected) {
    socketInstance.auth = { userId }
    socketInstance.connect()
  }
  
  return socketInstance
}

export function disconnectSocket() {
  if (socket && socket.connected) {
    socket.disconnect()
  }
}