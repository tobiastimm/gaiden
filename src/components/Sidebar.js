import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Container,
  Body,
  Left,
  CardItem,
  Content,
  Text,
  List,
  ListItem,
  StyleProvider,
  Thumbnail,
  Header,
  Icon,
  Button
} from 'native-base'
import styled from 'styled-components'

import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'
import { signOut } from '../lib/loginUtils'

const StyledHeader = styled(Header)`
  background: #353535;
  margin: 0;
  justify-content: flex-start;
  border-bottom-color: transparent;
  margin-bottom: 20px;
`

const Entry = styled(ListItem)`
  background: #353535;
`

const Divider = styled.View`
  border-color: #4c4a5a;
  border-bottom-width: ${StyleSheet.hairlineWidth};
  margin: 10px 0;
`

export default class SideBar extends React.Component {
  onSignOut = async () => {
    await signOut()
    this.props.navigation.navigate('Auth')
  }

  navigateTo = screen => {
    this.props.navigation.navigate(screen)
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={{ paddingTop: 15 }}>
          <StyledHeader noShadow>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://avatars1.githubusercontent.com/u/10043789?s=460&v=4'
                }}
              />
            </Left>
            <Body>
              <Text>Tobias Timm</Text>
              <Text note>tobiastimm</Text>
            </Body>
          </StyledHeader>
          <Content>
            <List>
              <Entry
                noBorder
                noIndent
                onPress={() => this.navigateTo('Home')}
                icon
              >
                <Left>
                  <Button transparent icon>
                    <Icon name="home" type="FontAwesome" />
                  </Button>
                </Left>
                <Body>
                  <Text>Home</Text>
                </Body>
              </Entry>
              <Divider />
              <Entry
                noBorder
                noIndent
                onPress={() => this.navigateTo('Trending')}
                icon
              >
                <Left>
                  <Button transparent>
                    <Icon name="line-chart" type="FontAwesome" />
                  </Button>
                </Left>
                <Body>
                  <Text>Trending</Text>
                </Body>
              </Entry>
              <Divider />
              <Entry
                noBorder
                noIndent
                onPress={() => this.navigateTo('Bug')}
                icon
              >
                <Left>
                  <Button transparent>
                    <Icon name="bug" type="FontAwesome" />
                  </Button>
                </Left>
                <Body>
                  <Text>Report a bug</Text>
                </Body>
              </Entry>
              <Entry
                noBorder
                noIndent
                onPress={() => this.navigateTo('Settings')}
                icon
              >
                <Left>
                  <Button transparent>
                    <Icon name="cog" type="FontAwesome" />
                  </Button>
                </Left>
                <Body>
                  <Text>Settings</Text>
                </Body>
              </Entry>
              <Entry
                noBorder
                noIndent
                onPress={() => this.navigateTo('About')}
                icon
              >
                <Left>
                  <Button transparent>
                    <Icon name="info-circle" type="FontAwesome" />
                  </Button>
                </Left>
                <Body>
                  <Text>About</Text>
                </Body>
              </Entry>
              <Divider />
              <Entry noBorder noIndent onPress={this.onSignOut} icon>
                <Left>
                  <Button transparent>
                    <Icon name="logout" type="MaterialCommunityIcons" />
                  </Button>
                </Left>
                <Body>
                  <Text>Logout</Text>
                </Body>
              </Entry>
            </List>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}
