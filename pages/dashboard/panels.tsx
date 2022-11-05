import React from "react";
import {
  useDashboardContextValue
} from "./context/dashboard-context";
import { ProfilePanel } from "./side-panels/profile-panel";
import { SectionPanel } from "./side-panels/section-panels";
import { StylePanel } from "./side-panels/style-panel";

type PanelsProps = {
  setOpenPanel: any; // Todo: Type this properly
  openPanel: string | "";
};

export const DashboardPanels: React.FC = () => {
  const { panelState } = useDashboardContextValue();

  let a = useDashboardContextValue();


  return (<div className="dashboard-panels">
      <SectionPanel setOpenPanel={false} openPanel={"openPanel"} />
      <StylePanel />
      <ProfilePanel />
    </div>);
};
