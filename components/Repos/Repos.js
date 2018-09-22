import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { Container, List, Card, CardItem, Body, Text } from 'native-base'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { GET_TRENDING_REPOS } from './GraphQLQueries'

import CompactRepo from './CompactRepo'

export default class Repos extends Component {
  render() {
    return (
      <View>
        <Query query={GET_TRENDING_REPOS}>
          {({ error, loading, data: { search } }) => {
            if (loading) return <ActivityIndicator size="large" />
            if (error) return `Error!: ${error}`
            return (
              <List
                dataArray={search.edges}
                renderRow={({ node: repo }) => <CompactRepo {...repo} />}
              />
            )
          }}
        </Query>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mb: {
    marginBottom: 15,
    padding: 10
  }
})
