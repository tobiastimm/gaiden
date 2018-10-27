import React, { Component } from 'react'
import {
  Container,
  Header,
  Content,
  List,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  StyleProvider
} from 'native-base'

import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'
import navigationStyles from '../styles/navigationStyles'

class TrendingSettings extends Component {
  static navigationOptions = {
    title: 'Settings',
    ...navigationStyles
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Content>
            <ListItem noIndent icon>
              <Left>
                <Text>Language</Text>
              </Left>
              <Body />
              <Right>
                <Text>All</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem noIndent icon>
              <Left>
                <Text>Range</Text>
              </Left>
              <Body />
              <Right>
                <Text>Today</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

export default TrendingSettings
