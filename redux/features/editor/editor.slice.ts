import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Views } from "../../../components/editor/drawers/section-drawer";

export interface Sections {
  items: Array<any>,
  pageMeta: {
    title: string, description: string
  },
  published?: boolean
}

export interface Editor {
  activePage?: { page: string, pageId: string, createdAt: Date },
  page: {
    items: Array<any>; pageMeta?: {
      title: string, description: string
    }
    background?: { color: string, hex: string, id: number }, template?: {
      id: string, name: string,
    }, profileImage?: string; coverImage?: string; createdAt?: Date; handle?: string; id?: string; published?: boolean; url?: string;
  }
}

export type socialsType = {
  name: string; url: string;
};
export type EmbedsType = {
  name: string; url: string;
};

const initialState: Editor = {
  page: {
    items: []
  }
};

// export const createNewPageFOrNewUser = createAsyncThunk("page/create-new-page", async (handle: string, {
//   getState, dispatch
// }) => {
//   const state: any = getState();
//
//   //TOdo: improve this batch write, try to use a class or object
//   let batch = writeBatch(db);
//   const newPageRef = doc(collection(db, "pages"));
//   batch.set(newPageRef, { handle: handle, createdAt: new Date() });
//   batch.set(doc(db, "users", `${state?.user?.user?.uid}`), {
//     ...state?.user.user, handle: handle, //pageId: newPageId,
//     createdAt: new Date()
//   });
//   const promise = batch.commit().then(() => dispatch(setUserHandle(handle)));
//   console.log("PROMISE", promise);
//   return promise;
// });

export const EditorSlice = createSlice({
  name: "editor", initialState,

  reducers: {
    setActivePageInfo: (state, { payload }) => {
      state.page = payload;
    }, setActivePage: (state, { payload }) => {
      state.activePage = payload;
    }, setPageImage: (state, { payload }) => {
      state.page.profileImage = payload;

    }, setPageCoverImage: (state, { payload }) => {
      state.page.coverImage = payload;
    },

    setReorderedSectionItems(state, action) {
      state.page.items = action.payload;
    }, addNewSectionItem: (state, action) => {
      state.page.items.push(action.payload);
    }, addNewTextAreaItem: (state, { payload }) => {
      state.page.items.push(payload);
    }, deleteSectionItem: (state, action) => {
      state.page.items.slice(action.payload, 1);
    }, setPageItemByIndex: (state, { payload }) => {
      if (payload.index == -1) {
        state.page.items[state.page.items.length - 1] = payload.data;
      } else {
        state.page.items[payload.index] = payload.data;
      }
    }, addNewLinkItem: (state, action) => {
      const i = state.page.items.findIndex((item) => item.type == Views.LINKS);
      if (i !== -1) {
        let linksObj = state.page.items[i];
        linksObj.links = [...linksObj.links, action.payload];
      } else {
        state.page.items.push({
          type: Views.LINKS, links: [action.payload]
        });
      }
    }, saveCustomLinks: (state, { payload }) => {
      const i = state.page.items.findIndex((item) => item.type == Views.LINKS);
      if (i !== -1) {
        let linksObj = state.page.items[i];
        // @ts-ignore
        linksObj.links[payload.index] = payload.data;
      } else {
        state.page.items.push({
          type: Views.LINKS, links: [payload.data]
        });
      }
    },


    saveSocialLinks: (state, action) => {
      const i = state.page.items.findIndex((item) => item.type == Views.SOCIALS);
      if (i !== -1) {
        let linksObj = state.page.items[i];
        linksObj.links = action.payload;
      } else {
        state.page.items.push({
          type: Views.SOCIALS, links: action.payload
        });
      }
    }, setPageMeta: (state, action) => {
      state.page.pageMeta = action.payload;
    }, setBackground: (state, { payload }) => {
      state.page.background = payload;
    },

    setCustomLinkImage:(state, { payload }) => {
      const i = state.page.items.findIndex((item) => item.type == Views.LINKS);
      if (i !== -1) {
        let linksObj = state.page.items[i];
        // @ts-ignore
        linksObj.links[payload.index].image = payload.data;
      }
      },

    deleteLinkImage:(state, { payload }) => {
      const i = state.page.items.findIndex((item) => item.type == Views.LINKS);
      if (i !== -1) {
        let linksObj = state.page.items[i];
        // @ts-ignore
        linksObj.links[payload].image = "";
      }
      }
  }
});


export const selectSocialLinks = (state: RootState) => state.editor.page.items?.findIndex((item, ) => item.type == Views.SOCIALS);
export const selectCustomLinks = (state: RootState) => state.editor.page.items?.findIndex((item, ) => item.type == Views.LINKS);
export const selectCustomLinksInStore = (state: RootState) => {
  const i = state.editor.page.items?.findIndex((item) => item.type == Views.LINKS);
  if (i !== -1) {
    return state.editor.page.items[i];
  }

  return null;
};


export const selectEditor = (state: RootState) => state.editor;
export const selectPage = (state: RootState) => state.editor.page;
export const {
  addNewSectionItem,
  setCustomLinkImage,
  deleteLinkImage,
  addNewTextAreaItem,
  saveSocialLinks,
  setPageCoverImage,
  setPageImage,
  setActivePage,
  setActivePageInfo,
  setPageMeta,
  setPageItemByIndex,
  saveCustomLinks,
  setBackground
} = EditorSlice.actions;
export default EditorSlice.reducer;
