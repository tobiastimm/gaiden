import React, { Component } from 'react'
import {
  Container,
  Content,
  Button,
  Title,
  Left,
  Right,
  Body,
  Header,
  Icon,
  StyleProvider
} from 'native-base'
import { StyleSheet, StatusBar } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'
import navigationStyles from '../styles/navigationStyles'
import Posts from './Posts/Posts'
import SideBar from './Sidebar'

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    ...navigationStyles
  }

  render() {
    const { navigation } = this.props
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
              <Title style={styles.title}>Posts</Title>
            </Body>
            <Right />
          </Header>
          <Content padder style={styles.content}>
            <Posts />
          </Content>
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

const Navigator = createDrawerNavigator(
  {
    Home: { screen: Home }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
)

export default Navigator
