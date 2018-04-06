import React, { Component } from 'react';
import './App.css';
import Product from './components/Product';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from "graphql-tag"; 

const client = new ApolloClient();

class App extends Component {
   
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Product />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
