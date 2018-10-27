import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
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
import styled from 'styled-components'

import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'

export default class DrawerLayout extends Component {
  render() {
    const { title, children, navigation, right } = this.props
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <StatusBar barStyle="light-content" />
          <Header>
            <Left
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon type="Feather" name="menu" />
              </Button>
            </Left>
            <Body
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Title>{title}</Title>
            </Body>
            <Right style={{ flex: 1 }}>{right && right()}</Right>
          </Header>
          <Container>{children}</Container>
        </Container>
      </StyleProvider>
    )
  }
}
