import Image from "next/image";
import cancelIcon from "../../assets/cancel.svg";
import React from "react";
import { Views } from "./drawers/section-drawer";
import {
  selectUiState, setActiveDrawer
} from "../../redux/features/ui-state/ui-state.slice";
import { DrawerEnums } from "../../enums";
import { useDispatch, useSelector } from "react-redux";

type PanelHeaderType = {
  setViewState?: any; viewState?: any;
};
export const DrawerHeader: React.FC<PanelHeaderType> = ({ setViewState }) => {
  const dispatch = useDispatch();
  const { drawerState } = useSelector(selectUiState);

  return (<div className="style-panel__header px-5 w-screen">
    <div className="style-panel__header--icon"
         onClick={() => setViewState(Views.MAIN)}>
      <Image alt={"cancel icon"}
             src={cancelIcon} />
    </div>
    <p className="style-panel__header--text"> {drawerState.activeDrawer}</p>

    <div
      className="style-panel__header--icon"
      onClick={() => {
        dispatch(setActiveDrawer(DrawerEnums.CLOSE));
      }}
    >
      <Image alt={"cancel icon"} src={cancelIcon} />
    </div>
  </div>);
};
