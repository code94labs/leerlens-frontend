import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material/styles";
import { appWithTranslation } from 'next-i18next'
import store, { persistor } from "../redux/store";
import theme from "../public/theme/theme";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default appWithTranslation(MyApp)
