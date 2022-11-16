import React from "react";
import { ProfilePanel } from "./drawers/profile-panel";
import { SectionPanel } from "./drawers/section-panels";
import { StylePanel } from "./drawers/style-panel";



type PanelsProps = {
  setOpenPanel: any; // Todo: Type this properly
  openPanel: string | "";
};

export const EditorDrawers: React.FC = () => {

  return (<div className="dashboard-panels">
      <SectionPanel setOpenPanel={false} openPanel={"openPanel"} />
      <StylePanel />
      <ProfilePanel />
    </div>);
};
