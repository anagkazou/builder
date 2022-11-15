import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { auth, provider } from "../../../firebase";

import type { RootState } from "../..";


const enum USER_LOADING_STATUS {
  LOADING="LOADING",
  FINISHED="FINISHED",
  ERROR="ERROR"
}
 interface UserState {
  pages?:Array<{handle:string, pageId:string}>,
  displayName?:string,
  createdAt?:Date,
  email?:string,
}

export interface UserStore{
  currentUser: UserState ;
}

const initialState: UserStore = {
  currentUser:{
    pages:[],
    displayName:undefined,
    createdAt:undefined,
    email:undefined
  }
};

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ auth, password, email }: any) => {
    return signInWithEmailAndPassword(auth, email, password).then((cred) => cred.user);
  }
);

export const registerWithEmail = createAsyncThunk(
  "auth/registerWithEmail",
  async ({ email, password, name }: any) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (cred: UserCredential) => cred.user
    );
  }
);

export const authWithGoogle = createAsyncThunk("auth/signInGoogle", async () => {
  const promise = signInWithPopup(auth, provider)
    .then((res: UserCredential) => res.user)
    .catch((error) => error);

 return await promise;
});

export const logOut = createAsyncThunk("auth/logout", async () => {
  const userAuth = getAuth();
  return signOut(userAuth).then(() => {
    //navigate to home page!
  });
});

export const UserSlice = createSlice({
  name: "user",
  initialState,
  // extraReducers: (builder) => {
  //   builder.addCase(loginWithEmail.fulfilled, (state, action) => {
  //     state = action.payload;
  //   });
  //   builder.addCase(loginWithEmail.rejected, (state, action) => {
  //     state.error = action.error.name;
  //   });
  //   builder.addCase(authWithGoogle.pending, (state, action) => {
  //     state.status = "LOADING";
  //   });
  //   builder.addCase(authWithGoogle.fulfilled, (state, action) => {
  //    // state.user = action.payload;
  //     state.status = "FINISHED";
  //   });
  // },
  reducers: {
    signinWithEmail: () => {},
    signUpWithEmail: () => {},
    logout: () => {},
    signInEmailAndPassword: () => {},
    setUserHandle: (state, { payload }) => {
      state.currentUser.pages =[payload];
    },
    setUser: (state, action) => {
      console.log("SEEETTTTTT", action.payload)
      state.currentUser = action.payload;
    },
  },
});

export const { signinWithEmail, logout, setUserHandle, setUser } = UserSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;

export default UserSlice.reducer;
