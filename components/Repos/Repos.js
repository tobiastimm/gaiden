import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Container, List, Card, CardItem, Body, Text } from 'native-base'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Repo from './Repo'

export const GET_REPOS = gql`
  query getReposForQuery($query: String = "stars", $first: Int = 2) {
    search(first: $first, type: REPOSITORY, query: $query) {
      edges {
        node {
          ... on Repository {
            name
          }
        }
      }
    }
  }
`

export default class Repos extends Component {
  render() {
    return (
      <Query query={GET_REPOS}>
        {({ error, loading, data: { search } }) => {
          if (loading) return <ActivityIndicator size="large" />
          if (error) return `Error!: ${error}`
          return (
            <List
              dataArray={search.edges}
              renderRow={({ node: repo }) => <Repo {...repo} />}
            />
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  mb: {
    marginBottom: 15,
    padding: 10
  }
})
