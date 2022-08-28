import { onAuthStateChanged } from "firebase/auth";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { auth, createUserProfileDocument } from "../firebase";
import { persistor, store } from "../redux";
import "../styles/globals.scss";
import "../styles/dashboard.scss";
import { DashboardContextProvider } from "./dashboard/context/dashboard-context";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DashboardContextProvider>
          <Component {...pageProps} />

        </DashboardContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
