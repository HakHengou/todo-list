import { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/home.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
