import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Header,
  Container,
  StyleProvider,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Tabs,
  ScrollableTab,
  Tab,
  Text,
  Spinner
} from 'native-base'
import { Query } from 'react-apollo'

import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'
import RepoHeader from '../components/RepoHeader'
import { GET_REPO } from '../components/Repos/GraphQLQueries'

export default class Repo extends Component {
  static navigationOptions = props => ({
    header: <RepoHeader {...props} title={props.navigation.state.params.name} />
  })

  render() {
    const { navigation } = this.props
    return (
      <StyleProvider style={getTheme(platform)}>
        <Query
          query={GET_REPO}
          variables={{
            name: navigation.state.params.name,
            owner: navigation.state.params.owner
          }}
        >
          {({ error, loading, refetch, fetchMore, data: { repository } }) => {
            if (loading) return <Spinner />
            if (error) return `Error!: ${error}`
            return (
              <Container>
                <Tabs renderTabBar={() => <ScrollableTab />}>
                  <Tab heading="README">
                    <Text />
                  </Tab>
                  <Tab heading="FILES">
                    <Text />
                  </Tab>
                  <Tab heading="COMMITS">
                    <Text />
                  </Tab>
                  <Tab heading="RELEASES">
                    <Text />
                  </Tab>
                  <Tab heading="CONTRIBUTORS">
                    <Text />
                  </Tab>
                </Tabs>
              </Container>
            )
          }}
        </Query>
      </StyleProvider>
    )
  }
}

const styles = StyleSheet.create({})
