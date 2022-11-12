import React from "react";

import { ProfilePanel } from "./side-panels/profile-panel";
import { SectionPanel } from "./side-panels/section-panels";
import { StylePanel } from "./side-panels/style-panel";

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
