import { Message } from '../../domain/entities/message/Message';

export class MessagePresenter {
  static toViewModel(message: Message) {
    return {
      ...message,
      timeAgo: formatTimeAgo(message.timestamp),
      isOwn: message.senderId === getCurrentUserId()
    };
  }
}

// Helpers
function formatTimeAgo(timestamp: string): string {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(timestamp).toLocaleDateString();
}

function getCurrentUserId(): string {
  // Mock
  return localStorage.getItem('astra_user_id') || '';
}
