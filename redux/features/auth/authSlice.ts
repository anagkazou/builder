import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { Auth, IdTokenResult, User, UserCredential } from "firebase/auth";
import { auth, createUserProfileDocument, provider } from "../../../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

import type { RootState } from "../..";
import { useEffect } from "react";
export interface UserState<T> {
  user?: T | null;
  status: "LOADING" | "FINISHED" | "ERROR";
  error?: string;
}
const initialState: UserState<User> = {
  user: null,
  status: "FINISHED",
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

  const data = await promise;
  return data;
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
  extraReducers: (builder) => {
    builder.addCase(loginWithEmail.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(loginWithEmail.rejected, (state, action) => {
      state.error = action.error.name;
    });
    builder.addCase(authWithGoogle.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(authWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
  reducers: {
    signinWithEmail: () => {},
    signUpWithEmail: () => {},
    logout: () => {},
    signInEmailAndPassword: () => {},
  },
});

export const { signinWithEmail, logout } = UserSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default UserSlice.reducer;
