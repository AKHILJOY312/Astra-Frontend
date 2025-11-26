import { Channel } from "@/domain/entities/channel/Channel";

export const channelResponseToEntity = (raw: any): Channel => {
  return new Channel({
    id: raw.id || raw._id, // support Mongo or clean ID
    projectId: raw.projectId,
    channelName: raw.channelName,
    description: raw.description ?? "",
    createdBy: raw.createdBy,
    isPrivate: raw.isPrivate ?? false,
    lastMessage: raw.lastMessage ?? null,
    unreadCount: raw.unreadCount ?? 0,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  });
};
