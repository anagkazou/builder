import { uuidv4 } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { collection, doc, writeBatch } from "firebase/firestore";
import { RootState } from "../..";
import { db } from "../../../firebase";
import { setUserPageId } from "../auth/authSlice";
// export interface IPage {
//   handle: string | null;
//   description: string | null;
//   profileImage: string;
//   coverImage: string;
//   sections: Array<socialsType | EmbedsType>;
// }

export class Page {
  handle;
  pageId: string | undefined;
  description?: string | undefined;
  profileImage?: string;
  coverImage?: string;
  sections?: Array<socialsType | EmbedsType>;
  status?: string;
  createdAt?: Date;
  constructor(
    handle: string | undefined,
    pageId: string,
    description?: string | undefined,
    profileImage?: string,
    coverImage?: any,
    sections?: Array<socialsType | EmbedsType>,
    status?: string,
    createdAt?: Date
  ) {
    this.handle = handle;
    this.pageId = pageId;
    this.description = description;
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

const initialState: Page = {
  pageId: undefined,
  handle: undefined,
  description: undefined,
};

export const createNewPageFOrNewUser = createAsyncThunk(
  "page/create-new-page",
  async (handle: string, { getState, dispatch }) => {
    const state: any = getState();
    const newPageId = uuidv4();

    //TOdo: improve this batch write, try to use a class or object
    let batch = writeBatch(db);
    const newPageRef = doc(collection(db, "pages"));
    batch.set(newPageRef, { handle: handle, pageId: newPageId, createdAt: new Date() });
    batch.set(doc(db, "users", `${state?.user?.user?.uid}`), {
      ...state?.user.user,
      handle: handle,
      pageId: newPageId,
      createdAt: new Date(),
    });
    const promise = batch.commit().then(() => dispatch(setUserPageId(newPageId)));
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
      state.pageId = action.payload.pageId;
      state.handle = action.payload.handle;
    },
    setPageDescription: (state, action) => {
      state.description = action.payload;
    },
    setPageFromFirestore: (state, {payload}) => {
      state.handle = payload.handle;
      state.pageId = payload.pageId
      state.createdAt = payload.createdAt

      console.log("SETPAGE", state);
    },
  },
});
export const selectpage = (state: RootState) => state.page;
export const { setPageFromFirestore } = PageSlice.actions;
export default PageSlice.reducer;
