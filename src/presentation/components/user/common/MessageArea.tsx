// src/presentation/components/channel/ChatSection.tsx  (or wherever your messages UI lives)

import { useEffect } from "react";
import { useMessages } from "@/presentation/hooks/useMessages";

import { useState } from "react";
import { messageGateway } from "@/data/gateway/MessageGateway";

interface Props {
  channelId: string; // passed from parent (channel list, route, etc.)
}

export default function MessageArea({ channelId }: Props) {
  // This hook does everything: loads history, joins socket room, listens live
  // const { currentProject } = useProjects();
  const { projectId } = useParams<{ projectId: string }>();
  const { channels } = useChannels(projectId!);

  const { messages, activeChannelId } = useMessages(
    projectId ?? null,
    channelId,
    channels
  );

  // Get messages for current channel from Redux

  const isLoading = !messages.length && activeChannelId === channelId; // optional loading state

  // Optional: scroll to bottom when new message arrives
  useEffect(() => {
    const el = document.getElementById("messages-end");
    el?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!channelId) {
    return (
      <div className=" items-center justify-center text-gray-500">
        Select a channel to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}
        <div id="messages-end" />
      </div>

      {/* Input Box */}
      <MessageInput channelId={channelId} projectId={projectId} />
    </div>
  );
}

// src/presentation/components/channel/MessageInput.tsx

interface MessageInputProps {
  channelId: string;
  projectId: string | undefined;
}

function MessageInput({ channelId, projectId }: MessageInputProps) {
  const [text, setText] = useState("");
  // const userId = useAppSelector((state) => state.auth.user?.id); // assuming you have user in auth slice

  const send = () => {
    if (!text.trim()) return;

    messageGateway.sendMessage({
      text: text.trim(),
      channelId,
      projectId: projectId,
    });

    setText(""); // clear input
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={send}
          disabled={!text.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

import { format } from "date-fns";
import { Message } from "@/domain/entities/message/Message";
import { useProjects } from "@/presentation/hooks/useProjects";
import { useAuth } from "@/presentation/hooks/useAuth";
import { useParams } from "react-router-dom";
import { useChannels } from "@/presentation/hooks/useChannels";

interface MessageBubbleProps {
  message: Message;
  isOwn?: boolean;
}

function MessageBubble({ message, isOwn = false }: MessageBubbleProps) {
  const time = format(new Date(message.createdAt), "HH:mm");
  const { user } = useAuth();
  if (message.senderId === user?.id) {
    isOwn = true;
  }

  return (
    <div
      className={`flex ${
        isOwn ? "justify-end" : "justify-start"
      } animate-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`
          max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm
          ${
            isOwn
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-white border border-gray-200 text-blue-900 rounded-bl-none"
          }
        `}
      >
        {/* Sender name (only show if not own message) */}
        {!isOwn && (
          <p className="text-xs font-semibold text-gray-500 mb-1">
            {message.senderId === user?.id
              ? "You"
              : ` ${message.senderName.slice(0, 6).split(" ")[0]}...`}
            {/* Replace with real name when you have users loaded */}
          </p>
        )}

        {/* Message text */}
        <p className="text-sm wrap-break-word">{message.text}</p>

        {/* Attachments indicator */}
        {message.hasAttachments && (
          <div className="mt-2 flex items-center gap-1 text-xs opacity-80">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Attachment
              {message.hasAttachments ? "s" : ""}
            </span>
          </div>
        )}

        {/* Timestamp */}
        <div
          className={`mt-1 text-xs ${
            isOwn ? "text-blue-100" : "text-gray-400"
          } text-right`}
        >
          {time}
          {isOwn && (
            <span className="ml-1">
              {/* Double tick when delivered/read */}
              <svg
                className="w-4 h-4 inline"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.7 4.3a1 1 0 00-1.4-1.4L6 9.2l-2.3-2.3a1 1 0 00-1.4 1.4l3 3a1 1 0 001.4 0l7-7z" />
                <path d="M13.7 7.3a1 1 0 00-1.4-1.4L7 11.2l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l7-7a1 1 0 000-1.4z" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
