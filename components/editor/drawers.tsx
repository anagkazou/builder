import React from "react";
import { ProfileDrawer } from "./drawers/profile-drawer";
import { SectionDrawer } from "./drawers/section-drawer";
import { StyleDrawer } from "./drawers/style-drawer";
import { TemplatesDrawer } from "./drawers/templates-drawer";
import { BackgroundDrawer } from "./drawers/background-drawer";


type PanelsProps = {
  setOpenPanel: any; // Todo: Type this properly
  openPanel: string | "";
};

export const EditorDrawers: React.FC = () => {

  return (<div className="dashboard-panels">
    <SectionDrawer setOpenPanel={false} openPanel={"openPanel"} />
    <StyleDrawer />
    <ProfileDrawer />
    <TemplatesDrawer />
    <BackgroundDrawer />
  </div>);
};
