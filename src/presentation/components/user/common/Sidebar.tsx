import { useState, useMemo } from "react";
import { Plus, Search, Menu, LogOut, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openCreateProjectModal } from "@/presentation/redux/slice/uiSlice";
import { useProjects } from "@/presentation/hooks/useProjects";
import type { RootState, AppDispatch } from "@/presentation/redux/store/store";
import { logoutUser } from "@/presentation/redux/thunk/authThunks";
import ProjectListItem from "./ProjectListItem";
import { PlanLimitBanner } from "./PlanLimitBanner";

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { projects, loading } = useProjects();
  const { sidebarOpen, theme } = useSelector((state: RootState) => state.ui);
  const user = useSelector((state: RootState) => state.auth.user);

  const [searchQuery, setSearchQuery] = useState("");

  // Memoized filtered projects to avoid re-computation on every render
  const filteredProjects = useMemo(() => {
    return (
      projects?.filter((p) =>
        p.projectName?.toLowerCase().includes(searchQuery.toLowerCase())
      ) ?? []
    );
  }, [projects, searchQuery]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "w-80" : "w-20"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div
          className={`flex items-center gap-3 ${
            !sidebarOpen && "justify-center"
          }`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Astra
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Team Workspace
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => dispatch({ type: "ui/toggleSidebar" })}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Search + Create */}
      {sidebarOpen && (
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => dispatch(openCreateProjectModal())}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
          <PlanLimitBanner />
        </div>
      )}

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto px-3">
        {loading ? (
          <div className="space-y-2 py-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-4" />
            <p className="text-sm">No projects yet</p>
            {sidebarOpen && (
              <p className="text-xs mt-1">Create your first project!</p>
            )}
          </div>
        ) : (
          <div className="space-y-1 py-2">
            {filteredProjects.map((project) => (
              <ProjectListItem
                key={project.id}
                project={project}
                isCollapsed={!sidebarOpen}
              />
            ))}
          </div>
        )}
      </div>

      {/* User Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <div
          className={`flex items-center gap-3 ${
            !sidebarOpen && "justify-center"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {user?.name?.[0] || "U"}
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name || user?.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Free Plan
              </p>
            </div>
          )}
          {sidebarOpen && (
            <div className="flex gap-1">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
