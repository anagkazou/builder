import { AppProps } from "next/app";

function AppComponent({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />;
}

export default AppComponent;