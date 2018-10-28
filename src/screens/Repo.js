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
import styled from 'styled-components'
import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'
import { RepoHeader } from '../components/Repo/RepoHeader'
import { GET_REPO } from '../api/getRepo'
import Markdown from '../components/Markdown'
import textStyles from '../styles/textStyles'
import { FullSpinner } from '../components/styles/SpinnerStyles'

const StyledTab = styled(Tab)`
  color: ${textStyles.color};
  background: ${textStyles.backgroundColor};
`

const StyledTabs = styled(ScrollableTab)`
  border-bottom-width: 0;
`

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
            if (loading) return <FullSpinner />
            if (error) return `Error!: ${error}`
            const readme = repository.object.entries.find(
              entry => entry.name === 'README.md'
            )
            return (
              <Container>
                <Tabs
                  style={{ backgroundColor: textStyles.backgroundColor }}
                  renderTabBar={() => (
                    <StyledTabs
                      tabsContainerStyle={{
                        backgroundColor: 'rgba(83, 82, 188, 1)'
                      }}
                    />
                  )}
                >
                  {readme && (
                    <StyledTab heading="README">
                      <Markdown content={readme.object.text} />
                    </StyledTab>
                  )}
                  <StyledTab heading="FILES">
                    <Text />
                  </StyledTab>
                  <StyledTab heading="COMMITS">
                    <Text />
                  </StyledTab>
                  <StyledTab heading="RELEASES">
                    <Text />
                  </StyledTab>
                  <StyledTab heading="CONTRIBUTORS">
                    <Text />
                  </StyledTab>
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
