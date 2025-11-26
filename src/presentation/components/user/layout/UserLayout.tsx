import ControllerBar from "../common/ControllerBar";

import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import UpgradePlanModal from "../common/UpgradePlanModal";
import { PlanLimitBanner } from "../common/PlanLimitBanner";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="flex h-screen bg-gray-100">
    //   {/* Left Sidebar */}
    //   {/* <ControllerBar /> */}

    //   {children}
    // </div>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Main Sidebar (Projects) */}
      <Sidebar />
      {children}
      <UpgradePlanModal></UpgradePlanModal>
      <PlanLimitBanner></PlanLimitBanner>
    </div>
  );
}
