export type MessageType = 'text' | 'file' | 'voice' | 'call';

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: MessageType;
  fileUrl?: string;
  fileName?: string;
  timestamp: string;
  isDeleted: boolean;
}
