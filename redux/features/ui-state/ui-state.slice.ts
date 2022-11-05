import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../index";

const initialState = {
  drawerState: {
    activeDrawer: null
  }, sectionsView: {
    activeSectionIndex: null,
    //Todo: try using enums here
    activeSectionView:'MAIN',
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
