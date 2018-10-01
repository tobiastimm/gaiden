import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, TouchableHighlight } from 'react-native'
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
import { formatDistance } from 'date-fns/esm/fp'

import { GET_REPO_HEADER } from './Repos/GraphQLQueries'
import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'

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
            {({ error, loading, refetch, fetchMore, data: { repository } }) => {
              if (loading) return <Spinner />
              if (error) return `Error!: ${error}`
              return (
                <Grid>
                  <Row style={{ alignItems: 'center', marginBottom: 10 }}>
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
                  {repository.repositoryTopics && (
                    <Row>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'space-between',
                          flexWrap: 'wrap',
                          marginBottom: 10
                        }}
                      >
                        {repository.repositoryTopics.edges.map(({ node }) => (
                          <Text style={styles.tag} key={node.topic.id}>
                            {node.topic.name}
                          </Text>
                        ))}
                      </View>
                    </Row>
                  )}
                  <Row>
                    <Left>
                      <Button transparent onPress={() => navigation.goBack()}>
                        <Icon
                          style={styles.drawerIcon}
                          type="Feather"
                          name="arrow-left"
                        />
                      </Button>
                    </Left>
                    <Body style={{ flexDirection: 'row' }}>
                      <Button
                        transparent
                        vertical
                        style={{
                          borderColor: '#fff',
                          borderWidth: 1,
                          paddingHorizontal: 5,
                          marginLeft: 0,
                          marginRight: 0,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Icon
                          name="eye"
                          type="FontAwesome"
                          style={{
                            height: 24,
                            marginLeft: 0,
                            marginRight: 0
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            paddingLeft: 0,
                            paddingRight: 0
                          }}
                        >
                          {repository.watchers.totalCount}
                        </Text>
                      </Button>
                      <Button
                        transparent
                        vertical
                        style={{
                          borderColor: '#fff',
                          borderWidth: 1,
                          paddingHorizontal: 5,
                          marginLeft: 0,
                          marginRight: 0,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Icon
                          name="star-o"
                          type="FontAwesome"
                          style={{
                            height: 24,
                            marginLeft: 0,
                            marginRight: 0
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            paddingLeft: 0,
                            paddingRight: 0
                          }}
                        >
                          {repository.stargazers.totalCount}
                        </Text>
                      </Button>
                      <Button
                        transparent
                        vertical
                        style={{
                          borderColor: '#fff',
                          borderWidth: 1,
                          paddingHorizontal: 5,
                          marginLeft: 0,
                          marginRight: 0
                        }}
                      >
                        <Icon
                          name="code-fork"
                          style={{
                            height: 24,
                            marginLeft: 0,
                            marginRight: 0
                          }}
                          type="FontAwesome"
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            paddingLeft: 0,
                            paddingRight: 0
                          }}
                        >
                          {repository.forks.totalCount}
                        </Text>
                      </Button>
                      <Button
                        transparent
                        vertical
                        style={{
                          borderColor: '#fff',
                          borderWidth: 1,
                          paddingHorizontal: 5,
                          marginLeft: 0,
                          marginRight: 0,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Icon
                          name="bookmark-o"
                          style={{
                            height: 24,
                            marginLeft: 0,
                            marginRight: 0
                          }}
                          type="FontAwesome"
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            paddingLeft: 0,
                            paddingRight: 0
                          }}
                        >
                          Pin
                        </Text>
                      </Button>
                      {repository.licenseInfo && (
                        <Button
                          vertical
                          transparent
                          style={{
                            borderColor: '#fff',
                            borderWidth: 1,
                            paddingHorizontal: 5,
                            marginLeft: 0,
                            marginRight: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Icon
                            name="balance-scale"
                            style={{
                              height: 24,
                              marginLeft: 0,
                              marginRight: 0
                            }}
                            type="FontAwesome"
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              paddingLeft: 0,
                              paddingRight: 0
                            }}
                          >
                            {repository.licenseInfo.key.toUpperCase()}
                          </Text>
                        </Button>
                      )}
                    </Body>
                    <Right>
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
