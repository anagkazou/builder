import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, writeBatch } from "firebase/firestore";
import { RootState } from "../..";
import { db } from "../../../firebase";
import { setUserHandle as setUserHandle } from "../auth/authSlice";
// export interface IPage {
//   handle: string | null;
//   description: string | null;
//   profileImage: string;
//   coverImage: string;
//   sections: Array<socialsType | EmbedsType>;
// }

//Todo: Fix this thing
export class Page {
  handle:string|null;
  // pageId: string | undefined;
  pageMeta?:PageMeta;
  profileImage?: string;
  coverImage?: string;
  sections?: Array<socialsType | EmbedsType>;
  status?: string;
  createdAt?: Date;
  constructor(
    handle: string | null,
    pageId: string,
    pageMeta?:PageMeta,
    profileImage?: string,
    coverImage?: any,
    sections?: Array<socialsType | EmbedsType>,
    status?: string,
    createdAt?: Date
  ) {
    this.handle = handle;
    this.pageMeta= pageMeta;
    this.profileImage = profileImage;
    this.coverImage = coverImage;
    this.sections = sections;
    this.status = status;
    this.createdAt = createdAt;
  }
}
export type socialsType = {
  name: string;
  url: string;
};
export type EmbedsType = {
  name: string;
  url: string;
};
export type PageMeta= {
  title:undefined|string,
  description:undefined|string,
}
const initialState: Page = {
  handle: null,
  pageMeta:{
    title:'default title',
    description:'default description'
  }
};

export const createNewPageFOrNewUser = createAsyncThunk(
  "page/create-new-page",
  async (handle: string, { getState, dispatch }) => {
    const state: any = getState();
    // const newPageId = uuidv4();

    //TOdo: improve this batch write, try to use a class or object
    let batch = writeBatch(db);
    const newPageRef = doc(collection(db, "pages"));
    batch.set(newPageRef, { handle: handle, createdAt: new Date() });
    batch.set(doc(db, "users", `${state?.user?.user?.uid}`), {
      ...state?.user.user,
      handle: handle,
      //pageId: newPageId,
      createdAt: new Date(),
    });
    const promise = batch.commit().then(() => dispatch(setUserHandle(handle)));
    console.log("PROMISE", promise);
    //Todo: sadd page Id to user not page... use page Id to get page details and store in page store
    return promise;
  }
);

export const PageSlice = createSlice({
  name: "page",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createNewPageFOrNewUser.fulfilled, (state, action) => {
      state.status = "FULFILLED";
      console.log("FULFILLED", action.payload);
    }),
      builder.addCase(createNewPageFOrNewUser.pending, (state, action) => {
        state.status = "PENDING";
      }),
      builder.addCase(createNewPageFOrNewUser.rejected, (state, action) => {
        state.status = "REJECTED";
        console.log(action);
      });
  },
  reducers: {
    setPageHandle: (state, action) => {
      console.log("AAAAA", state, action);
      // state.pageId = action.payload.pageId;
      state.handle = action.payload.handle;
    },
    setPageMeta: (state, action) => {
      state.pageMeta = action.payload;
    },

    setPageFromFirestore: (state, { payload }) => {
      state.handle = payload.handle;
     // state.pageId = payload.pageId;
      state.createdAt = payload.createdAt;

      console.log("SETPAGE", state);
    },
    setPageImage: (state, { payload }) => {
      state.profileImage = payload;

    },
    setPageCoverImage: (state, { payload }) => {
      state.coverImage = payload;
    },
  },
});
export const selectpage = (state: RootState) => state.page;
export const { setPageFromFirestore, setPageMeta, setPageCoverImage, setPageImage } = PageSlice.actions;
export default PageSlice.reducer;
