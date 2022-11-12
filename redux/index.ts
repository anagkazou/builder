import {
  Action,
  combineReducers,
  configureStore, ThunkAction
} from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer, { setUser } from "./features/auth/authSlice";
import pageReducer, {
  setPageHandle
} from "./features/page-data/page-data.slice";
import sectionsReducer from './features/sections/sections.slice';
import UiStateReducer from "./features/ui-state/ui-state.slice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, createUserProfileDocument } from "../firebase";
import { onSnapshot } from "@firebase/firestore";
import { DocumentSnapshot } from "@firebase/firestore-types";

const rootReducer = combineReducers({
  user: userReducer,
  page: pageReducer,
  sections: sectionsReducer,
  uiState: UiStateReducer
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "sections"],
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

  onAuthStateChanged(auth, async (userAuth) => {
    if (userAuth) {
      const userHandle:string|null = store.getState().user?.handle;
      const userRef = await createUserProfileDocument(userAuth,userHandle);
      // @ts-ignore
      onSnapshot(userRef, (snapshot: DocumentSnapshot) => {
        console.log(snapshot.data(), "SNAPSHOT");
        store.dispatch(setUser({ ...snapshot.data() }));
        store.dispatch(setPageHandle(snapshot.data()?.handle ));
      });
    }
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
