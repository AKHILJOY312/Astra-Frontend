import { io, Socket } from 'socket.io-client';
import { Message } from '../../../domain/entities/message/Message';

export class SocketGateway {
  private socket: Socket;

  constructor() {
    const token = localStorage.getItem('astra_token');
    this.socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
      auth: { token }
    });
  }

  onMessage(callback: (msg: Message) => void) {
    this.socket.on('new_message', callback);
  }

  sendMessage(channelId: string, content: string, type: Message['type'] = 'text') {
    this.socket.emit('send_message', { channelId, content, type });
  }

  joinChannel(channelId: string) {
    this.socket.emit('join_channel', channelId);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
