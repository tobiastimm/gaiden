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
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 10
        }}
      />
    )
  }

  renderFooter = (loading, networkStatus) => {
    if (!loading) return null
    if (networkStatus !== 1) {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1
          }}
        >
          <Spinner />
        </View>
      )
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <Query query={GET_TRENDING_REPOS} notifyOnNetworkStatusChange>
        {({
          error,
          loading,
          refetch,
          networkStatus,
          fetchMore,
          data: { search }
        }) => {
          if (networkStatus === 1) return <Spinner />
          if (error) return `Error!: ${error}`
          return (
            <View style={{ flex: 1 }}>
              <List>
                <FlatList
                  data={search.edges}
                  renderItem={({ item: { node: repo } }) => {
                    return (
                      <CompactRepo
                        onPress={() =>
                          navigation.navigate('Repo', {
                            id: repo.id,
                            name: repo.name,
                            owner: repo.owner.login
                          })
                        }
                        {...repo}
                      />
                    )
                  }}
                  onRefresh={() => refetch()}
                  refreshing={networkStatus === 4}
                  onEndReachedThreshold={0.5}
                  ItemSeparatorComponent={this.renderSeparator}
                  ListFooterComponent={() =>
                    this.renderFooter(loading, networkStatus)
                  }
                  onEndReached={() => {
                    fetchMore({
                      variables: {
                        after: search.edges[search.edges.length - 1].cursor
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (
                          !fetchMoreResult ||
                          fetchMoreResult.search.edges.length === 0
                        )
                          return prev
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
