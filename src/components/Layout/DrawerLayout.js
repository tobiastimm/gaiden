import React, { Component } from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import {
  Container,
  Button,
  Title,
  Left,
  Right,
  Body,
  Header,
  Icon,
  StyleProvider
} from 'native-base'
import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'

export default class DrawerLayout extends Component {
  render() {
    const { title, children, navigation } = this.props
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Header style={styles.header}>
            <StatusBar barStyle="light-content" />
            <Left>
              <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon style={styles.drawerIcon} name="menu" />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>{title}</Title>
            </Body>
            <Right />
          </Header>
          <Container>{children}</Container>
        </Container>
      </StyleProvider>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5352BC'
  },
  title: {
    color: '#FAF7FF'
  },
  drawerIcon: {
    color: '#FAF7FF'
  },
  content: {}
})
