import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux";
import "../styles/globals.scss";
import "../styles/editor.scss";
import AppComponent from "../components/app.component";


function App({ Component, pageProps }: AppProps) {


  return (<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/*<Component {...pageProps} />*/}
      <AppComponent {...pageProps} Component={Component}/>
    </PersistGate>
  </Provider>);
}

export default App;
