import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import ApolloClient, { InMemoryCache, HttpLink } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import NavWrapper from './components/Navigator'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  request: async operation => {
    const token = '46c1917e142964df849f444996d87872dfbf2946'
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
