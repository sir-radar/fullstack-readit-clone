import '../styles/globals.css';
import { AppProps } from 'next/app';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.withCredentials = true; //helps server to set credentials on the client

function App({Component, pageProps}: AppProps){
  return <Component {...pageProps}/>
}

export default App;
