import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Views } from "../../../pages/editor/side-panels/section-panels";


export const enum SectionEnums {
  TEXT_AREA = "TEXT_AREA", LINK = "LINK", EMBED = "EMBED",

}

export type TextArea = {
  title: string; content: string; type: string;
};
export type Links = {
  type: string, links: Array<LinkItem>
}
export type LinkItem = {
  description: string; url: string;
}

//Todo: something is wrong here
export type Sections = {
  items: Array<any>; pageMeta: {
    title: string, description: string
  }
  published?: boolean
};
const initialState: Sections = {
  items: [], pageMeta: {
    title: "default title", description: "default description"
  }
};



export const SectionSLice = createSlice({
  name: "sections", initialState, reducers: {

  }
});

// export const {
//
//
// } = SectionSLice.actions;
//
// export const selectSocialLinks = (state: RootState) => state.sections.items.findIndex((item, index) => item.type == Views.SOCIALS);
// export const selectCustomLinks = (state: RootState) => state.sections.items.findIndex((item, index) => item.type == Views.LINKS);
// export const selectCustomLinksInStore = (state: RootState) => {
//   const i = state.sections.items.findIndex((item) => item.type == Views.LINKS);
//   if (i !== -1) {
//     return state.sections.items[i];
//   }
//
//   return null;
// };
// export default SectionSLice.reducer;
// //Todo: move this sections array to the page slice
// export const selectSections = (state: RootState) => state.sections;
