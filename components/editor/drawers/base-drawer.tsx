import { SwipeableDrawer } from "@mui/material";
import { DrawerEnums } from "../../../enums";
import {
  selectUiState, setActiveDrawer, setActiveSectionView
} from "../../../redux/features/ui-state/ui-state.slice";
import { Views } from "./section-drawer";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode } from "react";
import { DrawerHeader } from "../drawer-header";


export const BaseDrawer = ( {children}: {children : ReactNode}) => {
  const dispatch = useDispatch();
  const {  drawerState } = useSelector(selectUiState);

  return (<SwipeableDrawer
      anchor={"bottom"}
      open={drawerState.activeDrawer === DrawerEnums.SECTIONS}
      onOpen={() => null}
      onClose={() => {
        // setPanelState(DrawerEnums.CLOSE);
        dispatch(setActiveDrawer(null));
        setTimeout(() => dispatch(setActiveSectionView(Views.MAIN)), 800);
      }}
      onBackdropClick={() => {
        dispatch(setActiveDrawer(Views.MAIN));
        setTimeout(() => dispatch(setActiveSectionView(Views.MAIN)), 800);
      }}
    >
    <div className="base-drawer">
      {children}
      <DrawerHeader/>
    </div>
    </SwipeableDrawer>);
};