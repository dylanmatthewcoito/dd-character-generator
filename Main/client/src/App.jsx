import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  // No need for Router here anymore, just provide the ApolloProvider
  return (
    <ApolloProvider client={client}>
      <div>
      <Navbar />
        {/* Content of App, perhaps some layout components */}
        <Outlet /> {/* This is where child routes will render */}
      </div>
    </ApolloProvider>
  );
}

export default App;
