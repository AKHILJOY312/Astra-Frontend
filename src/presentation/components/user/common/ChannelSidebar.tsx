// src/presentation/components/user/channel/ChannelSidebar.tsx
import {
  Hash,
  Plus,
  Settings,
  Bell,
  Search,
  Lock,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  openCreateChannelModal,
  openInviteMemberModal,
} from "@/presentation/redux/slice/uiSlice";

// Component for a reusable Channel Link
interface ChannelLinkProps {
  name: string;
  isPrivate: boolean;
  isActive?: boolean;
}

const ChannelLink = ({
  name,
  isPrivate,
  isActive = false,
}: ChannelLinkProps) => {
  const baseClasses =
    "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer";
  const defaultClasses =
    "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
  const activeClasses =
    "bg-blue-100 dark:bg-blue-600/50 text-blue-800 dark:text-white";

  return (
    <div
      className={`${baseClasses} ${isActive ? activeClasses : defaultClasses}`}
    >
      {isPrivate ? (
        <Lock
          className={`w-4 h-4 ${
            isActive
              ? "text-blue-800 dark:text-white"
              : "text-gray-400 dark:text-gray-500"
          }`}
        />
      ) : (
        <Hash
          className={`w-4 h-4 ${
            isActive
              ? "text-blue-800 dark:text-white"
              : "text-gray-400 dark:text-gray-500"
          }`}
        />
      )}
      <span className="truncate">{name}</span>
    </div>
  );
};

// Main Component
export default function ChannelSidebar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [activeChannelId, setActiveChannelId] = useState("1"); // Added state for visual active channel

  // Mock channels — replace with real data later
  const channels = [
    { id: "1", name: "general", isPrivate: false },
    { id: "2", name: "random", isPrivate: false },
    { id: "3", name: "design-team", isPrivate: true },
    { id: "4", name: "dev-ops-infrastructure-team-long-name", isPrivate: true },
    { id: "5", name: "marketing", isPrivate: false },
    { id: "6", name: "introductions", isPrivate: false },
  ];

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full shadow-lg">
      {/* Header (Workspace/Server Info) */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <h2 className="font-extrabold text-xl text-gray-900 dark:text-white truncate">
          Project Hub 🚀
        </h2>
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-100 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search channels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 transition-all"
          />
        </div>
      </div>

      {/* Channel List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Channels Section */}
        <div className="space-y-1">
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none">
              Channels
            </h3>
            <button
              onClick={() => dispatch(openCreateChannelModal())}
              title="Create new channel"
              className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200/50 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1">
            {filteredChannels.length > 0 ? (
              filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => setActiveChannelId(channel.id)}
                >
                  <ChannelLink
                    name={channel.name}
                    isPrivate={channel.isPrivate}
                    isActive={channel.id === activeChannelId}
                  />
                </div>
              ))
            ) : (
              <p className="text-xs text-center text-gray-400 dark:text-gray-600 py-4">
                No channels found.
              </p>
            )}
          </div>
        </div>

        {/* Direct Messages Placeholder (New Section for better UX) */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1 select-none">
            Direct Messages
          </h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-semibold text-white">
                A
              </span>
              <span className="truncate">Alice</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <span className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-semibold text-white">
                B
              </span>
              <span className="truncate">Bob</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Members and Invite Button */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900/50">
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 select-none">
          Project Members (12)
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {/* Member Avatars */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white dark:border-gray-950 flex items-center justify-center text-xs font-medium text-white shadow-md"
              >
                {/* Replace with actual initials/image */}
                {i === 0 ? "J" : i === 1 ? "M" : "S"}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 border-2 border-white dark:border-gray-950 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300 shadow-md select-none">
              +9
            </div>
          </div>

          {/* Invite Button */}
          <button
            onClick={() => dispatch(openInviteMemberModal())}
            title="Invite New People"
            className="flex items-center p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Invite
          </button>
        </div>
      </div>
    </div>
  );
}
