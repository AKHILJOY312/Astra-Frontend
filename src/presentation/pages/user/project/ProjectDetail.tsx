// src/presentation/pages/user/ProjectDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ChannelSidebar from "@/presentation/components/user/common/ChannelSidebar";
import MessageArea from "@/presentation/components/user/common/MessageArea";
import { setCurrentProject } from "@/presentation/redux/slice/projectSlice";
import { useProjects } from "@/presentation/hooks/useProjects";
import { useChannels } from "@/presentation/hooks/useChannels";

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch();
  const { projects } = useProjects();

  const { activeChannelId } = useChannels(projectId!);

  useEffect(() => {
    if (projectId) {
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        dispatch(setCurrentProject(project));
      }
    }
  }, [projectId, projects, dispatch]);

  return (
    <div className="flex-1 flex  h-full">
      <ChannelSidebar />
      {activeChannelId ? (
        <MessageArea channelId={activeChannelId} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          ← Select a channel to start chatting
        </div>
      )}
    </div>
  );
}
