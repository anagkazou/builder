import {
  Action,
  combineReducers,
  configureStore, ThunkAction
} from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer, { setUser } from "./features/auth/authSlice";
import editorReducer from "./features/page-data/page-data.slice";
import sectionsReducer from './features/sections/sections.slice';
import UIStateReducer from "./features/ui-state/ui-state.slice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, createUserProfileDocument } from "../firebase";
import { onSnapshot } from "@firebase/firestore";
import { DocumentSnapshot } from "@firebase/firestore-types";

const rootReducer = combineReducers({
  user: userReducer,
  editor: editorReducer,
  sections: sectionsReducer,
  uiState: UIStateReducer
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
      
      // @ts-ignore
      const userPage:string[] = store.getState().user?.currentUser?.pages;

      const userRef = await createUserProfileDocument(userAuth,userPage);
      // @ts-ignore
      onSnapshot(userRef, (snapshot: DocumentSnapshot) => {
        store.dispatch(setUser({ ...snapshot.data() }));
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
