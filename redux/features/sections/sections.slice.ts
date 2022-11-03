import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Views } from "../../../pages/dashboard/side-panels/section-panels";


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
  items: Array<any>;
};
const initialState: Sections = { items: [] };

export const DEFAULT_SOCIAL_LINKS = [{
  network: "Spotify", enabled: false, value: "", prefix: "", isUrl: true
}, {
  network: "Facebook", enabled: false, value: "", prefix: "", isUrl: true
}, {
  network: "Twitter", enabled: false, value: "", prefix: "", isUrl: false
}, {
  network: "Youtube", enabled: false, value: "", prefix: "", isUrl: true
}, {
  network: "Snapchat", enabled: false, value: "", prefix: "", isUrl: false
}, {
  network: "Linkedin", enabled: false, value: "", prefix: "", isUrl: true
}, {
  network: "Twitch", enabled: false, value: "", prefix: "", isUrl: false
}, {
  network: "Envelope", enabled: false, isUrl: true, value: "", prefix: ""
}];

export const DEFAULT_TEXT_AREA_PAYLOAD: TextArea = {
  type: SectionEnums.TEXT_AREA, title: "a title", content: "some content"

};
export const DEFAULT_CUSTOM_LINK: LinkItem = {
  description: "", url: ""
};

/**todo:
 *
 * Get sections from firestore in page bucket
 * If there is no data there, initialize with
 * **/
export const SectionSLice = createSlice({
  name: "sections", initialState, reducers: {
    setReorderedSectionItems(state, action) {
      state.items = action.payload;
    }, addNewSectionItem: (state, action) => {
      state.items.push(action.payload);
    }, addNewTextAreaItem: (state, { payload }) => {
      state.items.push(payload);
    }, deleteSectionItem: (state, action) => {
      state.items.slice(action.payload, 1);
    },

    setPageItemByIndex: (state, { payload }) => {
      console.log(payload);
      if (payload.index == -1) {
        state.items[state.items.length - 1] = payload.data;
      } else {
        state.items[payload.index] = payload.data;
      }
    }, addNewLinkItem: (state, action) => {
      const i = state.items.findIndex((item, index) => item.type == Views.LINKS);
      //  links.push(action.payload);
      if (i !== -1) {
        let linksObj = state.items[i];
        linksObj.links = [...linksObj.links, action.payload];
      } else {
        state.items.push({
          type: Views.LINKS, links: [action.payload]
        });
      }
    }, saveCustomLinks: (state, { payload }) => {
      const i = state.items.findIndex((item, index) => item.type == Views.LINKS);
      let linksObj = state.items[i];
      if (i !== -1) {
        let linksObj = state.items[i];
        // @ts-ignore
        linksObj.links[payload.index] = payload.data;
      } else {
        state.items.push({
          type: Views.LINKS, links: [payload.data]
        });
      }
    },

    //SOCIAL - LINKS REDUCERS

    saveSocialLinks: (state, action) => {
      const i = state.items.findIndex((item, index) => item.type == Views.SOCIALS);
      //  links.push(action.payload);
      console.log("LINKS::", i);
      if (i !== -1) {
        let linksObj = state.items[i];
        // @ts-ignore
        linksObj.links = action.payload;
      } else {
        state.items.push({
          type: Views.SOCIALS, links: action.payload
        });
      }
    }
  }
});

export const {
  addNewSectionItem,
  addNewLinkItem,
  saveSocialLinks,
  addNewTextAreaItem,
  setPageItemByIndex,
  saveCustomLinks
} = SectionSLice.actions;

export const selectSocialLinks = (state: RootState) => state.sections.items.findIndex((item, index) => item.type == Views.SOCIALS);
export const selectCustomLinks = (state: RootState) => state.sections.items.findIndex((item, index) => item.type == Views.LINKS);
export const selectCustomLinksInStore = (state: RootState) => {
  const i = state.sections.items.findIndex((item) => item.type == Views.LINKS);
  if (i !== -1) {
    return state.sections.items[i];
  }

  return null;
};
export default SectionSLice.reducer;
export const selectSections = (state: RootState) => state.sections;
