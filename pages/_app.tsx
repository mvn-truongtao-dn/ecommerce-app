import "../styles/scss/styles.scss"
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import { store } from "../store/store"
import "antd/dist/antd.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "test",
  currency: "USD",
  intent: "capture",
  "data-client-token":"ATlx1DWUI5l07_CLshplxlLtkCGhS892C8ur-s_Iy4OPk05t95bJwWtVhlfUQV2X5N9ANjWa-6YPvKRm",
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true} options={initialOptions}>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </Provider>
  )
}

export default MyApp
