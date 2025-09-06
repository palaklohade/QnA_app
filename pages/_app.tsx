import type { AppProps } from 'next/app';
import React from 'react';

// This is the root of your application.
// In a real app, you might import global CSS files here, for example:
// import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
