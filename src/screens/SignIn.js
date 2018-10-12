import React, { Component } from 'react'
import { authorize } from 'react-native-app-auth'
import { Text, Button, View, StyleSheet } from 'react-native'
import { signIn } from '../lib/loginUtils'
import { withApollo } from 'react-apollo'

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

class Login extends Component {
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
      <View style={styles.container}>
        <Button onPress={this.oauthGithub} title="Login with github" />
        <Text>{this.state.token}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default Login
