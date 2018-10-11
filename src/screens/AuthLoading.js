import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import { getToken } from '../lib/loginUtils'

class AuthLoading extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const userToken = await getToken()
    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="dark-content" />
      </View>
    )
  }
}

export default AuthLoading
