import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setActiveChannel,
  setMessages,
  addMessage,
  clearTextMessages,
} from "../redux/slice/messageSlice";
import { messageGateway } from "@/data/gateway/MessageGateway";
import api from "@/lib/apicaller";
import type { Channel } from "@/domain/entities/channel/Channel";

export function useMessages(
  projectId: string | null,
  channelId: string | null,
  channels: Channel[]
) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.messages.list);
  const activeChannelId = useAppSelector(
    (state) => state.messages.activeChannelId
  );

  // Clear when project changes
  useEffect(() => {
    dispatch(clearTextMessages());
  }, [projectId]);

  const channelExists = channels.some((c) => c.id === channelId);

  // Main logic
  useEffect(() => {
    if (!projectId || !channelId) return;
    if (!channelExists) return;

    // Clear
    dispatch(clearTextMessages());
    dispatch(setActiveChannel(channelId));

    // Load historical messages
    api
      .get(`/projects/${projectId}/channels/${channelId}/messages`)
      .then((res) => dispatch(setMessages(res.data.data)))
      .catch(console.error);

    // Join socket room
    messageGateway.joinChannel(channelId);

    // Subscribe
    const unsubscribe = messageGateway.subscribeToNewMessages((msg) => {
      if (msg.channelId === channelId) {
        dispatch(addMessage(msg));
      }
    });

    return () => {
      unsubscribe?.();
      messageGateway.leaveChannel(channelId);
    };
  }, [channelId, channelExists, projectId]);

  return {
    messages,
    activeChannelId,
  };
}
