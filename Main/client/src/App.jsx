import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import PromptPage from './pages/PromptPage';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const handleFormSubmit = (formData) => {
    // Here is where we handle the submission of the form data,
    // for example, sending the data to GraphQL server.
    console.log('Character Data:', formData);
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <PromptPage onSubmit={handleFormSubmit} />
      </div>
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
