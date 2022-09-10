import {
  Action,
  combineReducers,
  configureStore, ThunkAction
} from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/auth/authSlice";
import pageReducer from "./features/page-data/page-data.slice";

const rootReducer = combineReducers({
  user: userReducer,
  page: pageReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
