import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux";
import "../styles/globals.scss";
import "../styles/editor.scss";
import AppComponent from "../components/app.component";
import { createTheme, ThemeProvider } from "@mui/material";


function App({ Component, pageProps }: AppProps) {

  const theme = createTheme({
    palette: {
      mode: "light",

      primary: {
        // Purple and green play nicely together.
        main: "#545454"
      }, secondary: {
        main: "#fafafafa"
      }
    }
  });

  return (<Provider store={store}>
      <ThemeProvider theme={theme}>

        <PersistGate loading={null} persistor={persistor}>
          {/*<Component {...pageProps} />*/}
          <AppComponent {...pageProps} Component={Component} />
        </PersistGate>
      </ThemeProvider>

    </Provider>);
}

export default App;
