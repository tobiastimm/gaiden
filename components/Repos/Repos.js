import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React, { Component } from 'react'
import { FlatList, ListView } from 'react-native'
import {
  Container,
  List,
  Card,
  CardItem,
  Body,
  Text,
  Spinner
} from 'native-base'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { GET_TRENDING_REPOS } from './GraphQLQueries'

import CompactRepo from './CompactRepo'

export default class Repos extends Component {
  render() {
    return (
      <Query query={GET_TRENDING_REPOS}>
        {({
          error,
          loading,
          refetch,
          networkStatus,
          fetchMore,
          data: { search }
        }) => {
          if (loading) return <Spinner />
          if (error) return `Error!: ${error}`
          return (
            <View style={{ flex: 1 }}>
              <List>
                <FlatList
                  data={search.edges}
                  renderItem={({ item: { node: repo } }) => {
                    return <CompactRepo {...repo} />
                  }}
                  onRefresh={() => refetch()}
                  refreshing={networkStatus === 4}
                  onEndReachedThreshold={0.5}
                  onEndReached={() => {
                    fetchMore({
                      variables: {
                        after: search.edges[search.edges.length - 1].cursor
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev
                        return Object.assign({}, prev, {
                          search: {
                            ...prev.search,
                            edges: [
                              ...prev.search.edges,
                              ...fetchMoreResult.search.edges
                            ]
                          }
                        })
                      }
                    })
                  }}
                  keyExtractor={({ node: repo }) => repo.id}
                />
              </List>
            </View>
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
