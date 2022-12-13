import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { DrawerEnums } from "../../../enums";

interface DrawerState {
  drawerState: {
    activeDrawer?: DrawerEnums
  },
  sectionsView:{
    activeSectionIndex?: number,
    activeSectionView: string
  }
}
const initialState: DrawerState = {
  drawerState: {
    activeDrawer: undefined
  }, sectionsView: {
    activeSectionIndex: undefined,
    //Todo: try using enums here
    activeSectionView:"MAIN",
  }
};
export const UIStateSlice = createSlice({

  name: "ui", initialState, reducers: {
    setActiveDrawer: (state, { payload }) => {
      state.drawerState.activeDrawer = payload;
    }, setActiveSectionIndex: (state, { payload }) => {
      state.sectionsView.activeSectionIndex = payload;
    }, setActiveSectionView: (state, { payload }) => {
      state.sectionsView.activeSectionView = payload;
    }
  }
});

export const selectUiState = (state: RootState) => state.uiState;
export const {setActiveDrawer, setActiveSectionIndex, setActiveSectionView} = UIStateSlice.actions
export default UIStateSlice.reducer;
