// src/data/api/channelApi.ts  // bonus – you’ll need it soon
import api from "../../lib/apicaller";

export const createChannel = (payload: {
  projectId: string;
  channelName: string;
  description?: string;
  isPrivate?: boolean;
}) => api.post("/channels", payload);

export const getProjectChannels = (projectId: string) =>
  api.get(`/projects/${projectId}/channels`);

export const deleteChannel = (channelId: string) =>
  api.delete(`/channels/${channelId}`);
