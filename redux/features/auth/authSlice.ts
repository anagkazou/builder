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
export interface UserState {
  user?: User | null;
  status: "LOADING" | "FINISHED" | "ERROR";
  error?: string;
  handle: string | null;
}
const initialState: UserState = {
  user: null,
  status: "FINISHED",
  handle: null,
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
      state.status = "FINISHED";
    });
  },
  reducers: {
    signinWithEmail: () => {},
    signUpWithEmail: () => {},
    logout: () => {},
    signInEmailAndPassword: () => {},
    setUserHandle: (state, action) => {
      state.handle = action.payload;
    },
  },
});

export const { signinWithEmail, logout, setUserHandle } = UserSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default UserSlice.reducer;
