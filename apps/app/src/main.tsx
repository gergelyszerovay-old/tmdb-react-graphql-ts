import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import {ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {onError} from "@apollo/client/link/error";

import {cacheConfigLib} from '@tmdb-react-graphql/lib';

async function bootstrap() {
  const httpLink = createHttpLink({
    uri: 'http://' + window.location.hostname + ':4200/graphql/',
    // credentials: 'same-origin'
  });

  const errorLink = onError(({graphQLErrors}) => {
    if (graphQLErrors) {
      graphQLErrors.map(({message: messageText}) => {
        if (messageText === "Application Error") return;
        if (messageText === 'Argument Validation Error') return;
        console.log(messageText);
      });
    }
  });

  const link = ApolloLink.from([errorLink, httpLink]);

  const cache: InMemoryCache = new InMemoryCache(cacheConfigLib);

  const client = new ApolloClient({
    cache,
    link
  });

  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

bootstrap();

