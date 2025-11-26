// src/presentation/components/user/channel/ChannelSidebar.tsx
import { Hash, Plus, Settings, Bell, Search, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openCreateChannelModal } from "@/presentation/redux/slice/uiSlice";

export default function ChannelSidebar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // Mock channels — replace with real data later
  const channels = [
    { id: "1", name: "general", isPrivate: false },
    { id: "2", name: "random", isPrivate: false },
    { id: "3", name: "design-team", isPrivate: true },
    { id: "4", name: "dev-ops", isPrivate: true },
  ];

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="font-semibold text-gray-900 dark:text-white">General</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search channels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Channel List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Channels
            </h3>
            <button
              onClick={() => dispatch(openCreateChannelModal())}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300"
              >
                {channel.isPrivate ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Hash className="w-4 h-4" />
                )}
                <span className="text-sm">{channel.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Members */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Members
        </h3>
        <div className="flex -space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white dark:border-gray-900"
            />
          ))}
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-medium">
            +7
          </div>
        </div>
      </div>
    </div>
  );
}
