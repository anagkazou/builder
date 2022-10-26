import React, { createContext, useContext, useState } from "react";
type PanelsProps = {
  openPanel: string | "";
  setOpenPanel: any; // Todo: Type this properly
};
export const enum DrawerEnums {
  CLOSE = "",
  SECTIONS = "SECTIONS",
  PROFILE = "PROFILE",
  STYLE = "STYLE",
  PREVIEW = "PREVIEW",
  CROP_PROFILE_PHOTO = "CROP_PROFILE_PHOTO",
  CROP_COVER_PHOTO = "CROP_COVER_PHOTO",
}
//type DashboardContextProps = PanelsProps | null
type DrawerStateType =
  | ""
  | "SECTIONS"
  | "STYLE"
  | "PROFILE"
  | "PREVIEW"
  | "CROP_PROFILE_PHOTO"
  | "CROP_COVER_PHOTO";

export const DashboardContext = createContext<any>(null); // Todo: change type these properly!

export const DashboardContextProvider: React.FC<any> = ({ children }) => {
  const [panelState, setPanelState] = useState("");

  return (
    <DashboardContext.Provider value={{ panelState, setPanelState }}>
      {children}
    </DashboardContext.Provider>
  );
};

type DashboardContextValueType = () => {
  panelState: DrawerStateType;
  setPanelState: (a: DrawerEnums) => void;
}; // Todo: review this!
export const useDashboardContextValue: DashboardContextValueType = () =>
  useContext(DashboardContext);
