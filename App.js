import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { RestLink } from 'apollo-link-rest'

import NavWrapper from './components/Navigator'

const restLink = new RestLink({
  uri: 'https://www.reddit.com/'
})

// Configure the ApolloClient with the default cache and RestLink
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
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
