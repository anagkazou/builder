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


export interface  Editor {
  activePage?:Array<{handle?:string, pageId?:string}>,
  page:{
    sections?:Array<socialsType|EmbedsType>,
    profileImage?: string;
    coverImage?: string;
    createdAt?: Date;
    handle?: string;
    id?:string;
    published?:boolean;
    url?:string;
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

const initialState:Editor = {
  page:{}
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
    return promise;
  }
);

export const EditorSlice = createSlice({
  name: "editor",
  initialState,
  // extraReducers: (builder) => {
  //   builder.addCase(createNewPageFOrNewUser.fulfilled, (state, action) => {
  //     state.status = "FULFILLED";
  //     console.log("FULFILLED", action.payload);
  //   }),
  //     builder.addCase(createNewPageFOrNewUser.pending, (state, action) => {
  //       state.status = "PENDING";
  //     }),
  //     builder.addCase(createNewPageFOrNewUser.rejected, (state, action) => {
  //       state.status = "REJECTED";
  //       console.log(action);
  //     });
  // },
  reducers: {
    // setPageHandle: (state, action) => {
    //   console.log("AAAAA", state, action);
    //   // state.pageId = action.payload.pageId;
    //   state.handle = action.payload?.handle;
    // },

    setActivePage:(state,{payload})=> {
      state.activePage=payload;
    },
    setPageImage: (state, { payload }) => {
      state.page.profileImage = payload;

    },
    setPageCoverImage: (state, { payload }) => {
      state.page.coverImage = payload;
    },
  },
});
export const selectpage = (state: RootState) => state.page;
export const {  setPageCoverImage, setPageImage, setActivePage } = EditorSlice.actions;
export default EditorSlice.reducer;
