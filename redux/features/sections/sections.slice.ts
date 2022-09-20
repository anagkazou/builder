import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Views } from "../../../pages/dashboard/side-panels/section-panels";

export type TextBox = {
  title: string;
  content: string;
  type: string;
};
export type Links = {
  type: string,
  links: Array<LinkItem>
}
export type LinkItem = {
  description: string;
  url: string;
}
export type Sections = {
  items: Array<TextBox | Links>;
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
    addNewLinkItem: (state, action) => {
      const i = state.items.findIndex((item, index) => item.type == Views.LINKS);
      //  links.push(action.payload);
      console.log("LINKS::", i);
      if (i !== -1) {
        let linksObj = state.items[i];
        // @ts-ignore
        linksObj.links = [...linksObj.links, action.payload];
      } else {
        state.items.push({
          type: Views.LINKS,
          links: [action.payload]
        });
      }
    },
    addNewSocialLink: (state, action) => {
      const i = state.items.findIndex((item, index) => item.type == Views.SOCIALS);
      //  links.push(action.payload);
      console.log("LINKS::", i);
      if (i !== -1) {
        let linksObj = state.items[i];
        // @ts-ignore
        linksObj.links = [...linksObj.links, action.payload];
      } else {
        state.items.push({
          type: Views.SOCIALS,
          links: [action.payload]
        });
      }
    }
  }
});

export const { addNewSectionItem, addNewLinkItem } = SectionSLice.actions;

export default SectionSLice.reducer;

export const selectSections = (state: RootState) => state.sections;
