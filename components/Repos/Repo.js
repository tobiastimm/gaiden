import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Repo extends Component {
  static navigationOptions = ({ navigation }) => ({})

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
