//import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import App from './App';

const client = new ApolloClient({
  cache: new InMemoryCache({}),
  ssrMode: typeof window === 'undefined',
  // Create Apollo Link capable of handling file uploads
  link: createUploadLink({
    uri: process.env.REACT_APP_API_URI,
  }),
  fetchOptions: {
    mode: "cors"
  },
});

ReactDOM.render(
  // Allow child Components to access our ApolloClient
  <ApolloProvider 
    client={client}
  >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

//reportWebVitals();
