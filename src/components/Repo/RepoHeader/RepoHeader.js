import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
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
  Text,
  Thumbnail,
  Spinner
} from 'native-base'
import { Col, Grid, Row } from 'react-native-easy-grid'
import { Query } from 'react-apollo'
import pretty from 'prettysize'
import styled from 'styled-components'
import { formatDistance } from 'date-fns/esm/fp'

import { GET_REPO_HEADER } from '../../../api/getRepoHeader'
import getTheme from '../../../native-base-theme/components'
import platform from '../../../native-base-theme/variables/platform'
import Topics from './Topics'
import ToggleIcon from './ToggleIcon'
import { FullSpinner } from '../../styles/SpinnerStyles'

export default class RepoHeader extends Component {
  showDescription = () => {}

  render() {
    const { navigation } = this.props
    return (
      <StyleProvider style={getTheme(platform)}>
        <Header style={styles.header}>
          <StatusBar barStyle="light-content" />

          <Query
            query={GET_REPO_HEADER}
            variables={{
              name: navigation.state.params.name,
              owner: navigation.state.params.owner
            }}
          >
            {({ error, loading, data: { repository } }) => {
              if (loading) return <FullSpinner />
              if (error) return `Error!: ${error}`
              return (
                <Grid>
                  <Row style={{ alignItems: 'center', marginBottom: 5 }}>
                    <Col size={0.8 / 4}>
                      <Thumbnail
                        square
                        style={styles.thumbnail}
                        source={{ uri: repository.owner.avatarUrl }}
                      />
                    </Col>
                    <Col size={2.6 / 4}>
                      <Text style={styles.repoName}>
                        {repository.owner.login} / {repository.name}
                      </Text>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.repoInfo}>
                          {formatDistance(repository.updatedAt, new Date())}{' '}
                          ago,{' '}
                          {pretty(repository.diskUsage * 1000, { places: 2 })}
                        </Text>
                        {repository.primaryLanguage && (
                          <Text
                            style={{
                              marginTop: 5,
                              fontSize: 12,
                              color: repository.primaryLanguage.color
                            }}
                          >
                            {repository.primaryLanguage.name}
                          </Text>
                        )}
                      </View>
                    </Col>
                    <Col size={0.6 / 4}>
                      <Right
                        style={{
                          alignItems: 'center'
                        }}
                      >
                        <Button transparent onPress={this.showDescription}>
                          <Icon
                            style={styles.drawerIcon}
                            type="Feather"
                            name="info"
                          />
                        </Button>
                      </Right>
                    </Col>
                  </Row>
                  {!!repository.repositoryTopics.length && (
                    <Row>
                      <Topics data={repository.repositoryTopics.edges} />
                    </Row>
                  )}
                  <Row>
                    <Left style={{ flex: 0 }}>
                      <Button transparent onPress={() => navigation.goBack()}>
                        <Icon
                          style={styles.drawerIcon}
                          type="Feather"
                          name="arrow-left"
                        />
                      </Button>
                    </Left>
                    <Body
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <ToggleIcon
                        iconName="eye"
                        label={repository.watchers.totalCount}
                      />
                      <ToggleIcon
                        iconName="star-o"
                        label={repository.stargazers.totalCount}
                      />
                      <ToggleIcon
                        iconName="code-fork"
                        label={repository.forks.totalCount}
                      />
                      <ToggleIcon iconName="bookmark-o" label="Pin" />
                      {repository.hasWikiEnabled && (
                        <ToggleIcon iconName="book" label="Wiki" />
                      )}
                      {repository.licenseInfo && (
                        <ToggleIcon
                          iconName="balance-scale"
                          label={repository.licenseInfo.key.toUpperCase()}
                        />
                      )}
                    </Body>
                    <Right style={{ flex: 0 }}>
                      <Button transparent>
                        <Icon
                          style={styles.drawerIcon}
                          type="Entypo"
                          name="dots-three-horizontal"
                        />
                      </Button>
                    </Right>
                  </Row>
                </Grid>
              )
            }}
          </Query>
        </Header>
      </StyleProvider>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5352BC',
    borderBottomColor: 'transparent',
    elevation: 0,
    shadowColor: null,
    shadowOffset: null,
    shadowRadius: null,
    shadowOpacity: null
  },
  thumbnail: {
    borderRadius: 3
  },
  repoName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  repoInfo: {
    color: 'rgba(211,210,255,1)',
    marginTop: 5,
    marginRight: 5,
    fontSize: 12
  },
  title: {
    alignSelf: 'center',
    color: '#FAF7FF',
    fontSize: 16
  },
  drawerIcon: {
    color: '#FAF7FF'
  },
  tag: {
    color: 'rgba(211,210,255,1)',
    backgroundColor: 'rgba(109,108,214,1)',
    padding: 4,
    fontSize: 12,
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5
  },
  content: {}
})
