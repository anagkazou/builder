import { Action, configureStore, Store, ThunkAction } from "@reduxjs/toolkit";
import { type } from "os";

import userReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
