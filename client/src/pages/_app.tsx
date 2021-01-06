import { Fragment } from 'react';
import { AppProps } from 'next/app';
import {useRouter} from 'next/router'
import axios from 'axios';

import '../styles/tailwind.css';

import Navbar from '../components/Navbar';


axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.withCredentials = true; //helps server to set credentials on the client

function App({Component, pageProps}: AppProps){
  const {pathname} = useRouter();
  const authRoutes = ['/register', '/login'];
  const authRoute = authRoutes.includes(pathname)
  return <Fragment>
      {!authRoute && <Navbar/>}
      <Component {...pageProps}/>
  </Fragment>

}

export default App;
