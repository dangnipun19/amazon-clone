import '../styles/globals.css'
import { store } from "../app/store"
import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"
 
function MyApp({ Component, pageProps }) {
 
  return (
  <Provider store={store}>
  <SessionProvider session={pageProps.session}>
  <Component {...pageProps} />
  </SessionProvider>
  </Provider>
)}

export default MyApp
