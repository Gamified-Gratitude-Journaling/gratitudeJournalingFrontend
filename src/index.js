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

const PROD_REACT_APP_API_URI='https://vast-dawn-11590.herokuapp.com/graphql';

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

console.log(process.env);

const client = new ApolloClient({
  cache: new InMemoryCache({}),
  ssrMode: typeof window === 'undefined',
  link: authLink.concat(createUploadLink({
    uri: (process.env.NODE_ENV === 'production') ? PROD_REACT_APP_API_URI : process.env.REACT_APP_API_URI,
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
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

//reportWebVitals();
