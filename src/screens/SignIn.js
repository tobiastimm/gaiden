import React, { Component } from 'react'
import { authorize } from 'react-native-app-auth'
import { StatusBar, StyleSheet, View } from 'react-native'
import {
  StyleProvider,
  Container,
  Text,
  Button,
  Icon,
  Content,
  CardItem,
  Body,
  Card
} from 'native-base'
import styled from 'styled-components'

import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'
import { signIn } from '../lib/loginUtils'
import navigationStyles from '../styles/navigationStyles'
import theme from '../styles/theme'

const config = {
  clientId: '02075ad2957d0441150e',
  clientSecret: 'e2b814a220f236beaa5dace45086a5b9c7cd9c24',
  redirectUrl: 'gaiden://oauth',
  scopes: [
    'repo',
    'read:org',
    'read:public_key',
    'read:repo_hook',
    'admin:repo_hook',
    'gist',
    'notifications',
    'user',
    'write:discussion',
    'read:discussion',
    'read:gpg_key'
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/02075ad2957d0441150e'
  }
}

const StyledContainer = styled(Container)`
  background: #5352bc;
`

const StyledCard = styled(Card)`
  height: 150;
  width: 220;
  shadow-offset: 2px 2px;
  shadow-color: #353535;
  shadow-opacity: 0.7;
  shadow-radius: 5;
`

const Header = styled(CardItem)`
  flex: 0.6;
  justify-content: center;
  align-items: flex-start;
  background: ${theme.palette.gray};
`
const StyledCardItem = styled(CardItem)`
  background: ${theme.palette.gray};
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Background = styled(Container)`
  position: absolute;
  z-index: -1;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
`

const BackgroundText = styled(Text)`
  font-size: 250;
  opacity: 0.4;
  color: ${theme.text.color};
  shadow-offset: -1px 1px;
  shadow-color: #faf7ff;
  shadow-opacity: 0.7;
  shadow-radius: 10;
`

class SignIn extends Component {
  static navigationOptions = {
    title: 'gaiden',
    header: null,
    ...navigationStyles
  }

  state = {
    token: ''
  }

  oauthGithub = async () => {
    try {
      const result = await authorize(config)
      await signIn(result.accessToken)
      this.props.navigation.navigate('App')
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <StyledContainer>
          <StatusBar barStyle="light-content" />
          <Content
            scrollEnabled={false}
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            padder
          >
            <Background>
              <BackgroundText>外伝</BackgroundText>
            </Background>
            <StyledCard>
              <Header header>
                <Button vertical transparent>
                  <Icon
                    style={{ fontSize: 44, color: theme.palette.white }}
                    name="logo-github"
                  />
                </Button>
              </Header>
              <StyledCardItem button>
                <Body
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Button
                    style={{ alignSelf: 'center' }}
                    onPress={this.oauthGithub}
                  >
                    <Text>Login with GitHub</Text>
                  </Button>
                </Body>
              </StyledCardItem>
            </StyledCard>
          </Content>
        </StyledContainer>
      </StyleProvider>
    )
  }
}

export default SignIn
