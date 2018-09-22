import React, { Component } from 'react'
import { Text, View } from 'react-native'

import OAuthManager from 'react-native-oauth'

const manager = new OAuthManager('gaiden')
manager.configure({
  github: {
    callback_url: `io.fullstack.FirestackExample:/oauth2redirect`,
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_SECRET'
  }
})

export default class Login extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
