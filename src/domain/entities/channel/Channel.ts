export interface Channel {
  id: string;
  name: string;
  projectId: string;
  memberIds: string[];
  lastMessage?: string;
  unreadCount: number;
  createdAt: string;
}
