//import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

import './index.css';
import App from './App';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache({}),
  ssrMode: typeof window === 'undefined',
  link: authLink.concat(createUploadLink({
    uri: process.env.REACT_APP_API_URI,
  })),
  fetchOptions: {
    mode: "cors"
  },
});

ReactDOM.render(
  // Allow child Components to access our ApolloClient
  <ApolloProvider 
    client={client}
  >
    <App id='App'/>
  </ApolloProvider>,
  document.getElementById('root')
);

//reportWebVitals();
