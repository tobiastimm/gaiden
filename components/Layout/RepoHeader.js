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

import { GET_REPO } from '../Repos/GraphQLQueries'
import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'

export default class RepoHeader extends Component {
  render() {
    const { navigation } = this.props
    return (
      <StyleProvider style={getTheme(platform)}>
        <Header style={styles.header}>
          <StatusBar barStyle="light-content" />

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
                <Grid>
                  <Row style={{ alignItems: 'center' }}>
                    <Col size={0.8 / 4}>
                      <Thumbnail
                        square
                        style={styles.thumbnail}
                        source={{ uri: repository.owner.avatarUrl }}
                      />
                    </Col>
                    <Col size={2.4 / 4}>
                      <Text style={styles.repoName}>
                        {repository.owner.login} / {repository.name}
                      </Text>
                      <Text style={styles.repoInfo}>Randomtext</Text>
                    </Col>
                    <Col size={0.8 / 4}>
                      <Button transparent onPress={() => navigation.goBack()}>
                        <Icon
                          style={styles.drawerIcon}
                          type="Feather"
                          name="arrow-left"
                        />
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Left style={{ flex: 1 }}>
                      <Button transparent onPress={() => navigation.goBack()}>
                        <Icon
                          style={styles.drawerIcon}
                          type="Feather"
                          name="arrow-left"
                        />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={styles.title}>...</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
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
    fontSize: 14
  },
  title: {
    alignSelf: 'center',
    color: '#FAF7FF',
    fontSize: 16
  },
  drawerIcon: {
    color: '#FAF7FF'
  },
  content: {}
})
