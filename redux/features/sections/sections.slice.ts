import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";

export type TextBox = {
  title: string;
  content: string;
};
export type Sections = {
  items: Array<TextBox>;
};
const initialState: Sections = { items: [] };
export const SectionSLice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    setReorderedSectionItems(state, action) {
      state.items = action.payload;
    },
    addNewSectionItem: (state, action) => {
      state.items.push(action.payload);
    },
    deleteSectionItem: (state, action) => {
      state.items.slice(action.payload, 1);
    },
  },
});

export const { addNewSectionItem } = SectionSLice.actions;

export default SectionSLice.reducer;

export const selectSections = (state: RootState) => state.sections;
