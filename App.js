import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import ApolloClient, { InMemoryCache, HttpLink } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import NavWrapper from './components/Navigator'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  request: async operation => {
    const token = '340043e688e311b5fc8a24bc8cf140df20d4aa61'
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null
      }
    })
  }
})

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <NavWrapper />
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
