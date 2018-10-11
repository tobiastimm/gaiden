import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'
import { getToken } from './src/lib/loginUtils'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

import NavWrapper from './src/config/routes'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache({ fragmentMatcher }),
  request: async operation => {
    const token = await getToken()
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
