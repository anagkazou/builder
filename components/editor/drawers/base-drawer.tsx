import { SwipeableDrawer } from "@mui/material";
import { DrawerEnums } from "../../../enums";
import {
  selectUiState, setActiveDrawer, setActiveSectionView
} from "../../../redux/features/ui-state/ui-state.slice";
import { Views } from "./section-drawer";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode } from "react";
import { DrawerHeader } from "../drawer-header";


export const BaseDrawer = ({
                             children, drawerName
                           }: { children: ReactNode, drawerName: DrawerEnums }) => {
  const dispatch = useDispatch();
  const { drawerState, inputInFocus } = useSelector(selectUiState);

  return (<SwipeableDrawer
    anchor={"bottom"}
    open={drawerState.activeDrawer === drawerName}
    onOpen={() => null}
    onClose={() => {

      dispatch(setActiveDrawer(null));
      if (drawerName == DrawerEnums.SECTIONS) setTimeout(() => dispatch(setActiveSectionView(Views.MAIN)), 800);
    }}
    onBackdropClick={() => {
      dispatch(setActiveDrawer(DrawerEnums.CLOSE));
      if (drawerName == DrawerEnums.SECTIONS) setTimeout(() => dispatch(setActiveSectionView(Views.MAIN)), 800);
    }}
  >
    <div className="base-drawer">
      {children}
      {!inputInFocus && <DrawerHeader />}
    </div>
  </SwipeableDrawer>);
};