import React, { useEffect, useState } from "react";
import { useDashboardContextValue } from "./context/dashboard-context";
import { SectionPanel } from "./side-panels/sections-panel";
import { StylePanel } from "./side-panels/style-panel";
type PanelsProps = {
  setOpenPanel: any; // Todo: Type this properly
  openPanel: string | "";
};

export const DashboardPanels: React.FC = () => {
  const { panelState } = useDashboardContextValue();

  let a = useDashboardContextValue();

  useEffect(() => {
    console.log(" PANELsTATE::", panelState);
    console.log("panelllll", a);
  }, []);

  return (
    <div className="dashboard-panels">
      <SectionPanel setOpenPanel={false} openPanel={"openPanel"} />
      <StylePanel/>
    </div>
  );
};
