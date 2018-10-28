import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React, { Component } from 'react'
import { FlatList, ListView } from 'react-native'
import debounce from 'lodash/debounce'
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
import { GET_TRENDING_REPOS } from '../../api/getTrendingRepos'
import { FullSpinner } from '../styles/SpinnerStyles'
import CompactRepo from './CompactRepo'
import { format } from 'date-fns/esm'

export default class Repos extends Component {
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 5
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
      <Query
        query={GET_TRENDING_REPOS}
        notifyOnNetworkStatusChange
        variables={{
          query: `language:? created:${format(
            Date.now(),
            'yyyy-MM-dd'
          )} stars:>1`
        }}
      >
        {({
          error,
          loading,
          refetch,
          networkStatus,
          fetchMore,
          data: { search }
        }) => {
          if (networkStatus === 1) return <FullSpinner />
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
                  getItemLayout={(data, index) => ({
                    offset: 112.5 * index,
                    length: 112.5,
                    index
                  })}
                  ItemSeparatorComponent={this.renderSeparator}
                  ListFooterComponent={() =>
                    this.renderFooter(loading, networkStatus)
                  }
                  onMomentumScrollBegin={() => {
                    this.onEndReachedCalledDuringMomentum = false
                  }}
                  onEndReached={() => {
                    if (!this.onEndReachedCalledDuringMomentum && !loading) {
                      fetchMore({
                        variables: {
                          after: search.edges[search.edges.length - 1].cursor
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (
                            !fetchMoreResult ||
                            fetchMoreResult.search.edges.length === 0
                          ) {
                            return
                          }
                          const entries = fetchMoreResult.search.edges
                          return {
                            search: {
                              ...prev.search,
                              edges: [...prev.search.edges, ...entries]
                            }
                          }
                        }
                      })
                      this.onEndReachedCalledDuringMomentum = true
                    }
                  }}
                  keyExtractor={({ node: repo }) => repo.id + repo.name}
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
