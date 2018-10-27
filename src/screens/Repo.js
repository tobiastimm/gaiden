import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
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
import { RepoHeader } from '../components/Repo/RepoHeader'
import { GET_REPO } from '../api/getRepo'
import Markdown from '../components/Markdown'

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
            name: navigation.state.params.name || 'graphql-editor',
            owner: navigation.state.params.owner || 'slothking-online'
          }}
        >
          {({ error, loading, refetch, fetchMore, data: { repository } }) => {
            if (loading) return <Spinner />
            if (error) return `Error!: ${error}`
            const readme = repository.object.entries.find(
              entry => entry.name === 'README.md'
            )

            return (
              <Container>
                <Tabs
                  renderTabBar={() => (
                    <ScrollableTab
                      tabsContainerStyle={{
                        backgroundColor: 'rgba(83, 82, 188, 1)'
                      }}
                    />
                  )}
                >
                  {readme && (
                    <Tab heading="README">
                      <Markdown content={readme.object.text} />
                    </Tab>
                  )}
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
