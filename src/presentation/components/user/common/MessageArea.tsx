// src/presentation/components/user/channel/MessageArea.tsx
import { Send, Paperclip, Smile, Mic } from "lucide-react";
import { useState } from "react";

export default function MessageArea() {
  const [message, setMessage] = useState("");

  // Mock messages
  const messages = [
    {
      id: 1,
      user: "Alex",
      text: "Hey team! Ready for the demo?",
      time: "10:30 AM",
      avatar: "A",
    },
    {
      id: 2,
      user: "Sarah",
      text: "Yes! I'll share the Figma link",
      time: "10:32 AM",
      avatar: "S",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-950">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-200 dark:bg-gray-800 border-2 border-dashed rounded-3xl w-24 h-24 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Welcome to #general
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This is the start of your conversation
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {msg.user}
                  </span>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && e.preventDefault()
            }
          />
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
            <Smile className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
            <Mic className="w-5 h-5" />
          </button>
          <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
