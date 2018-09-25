import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import navigationStyles from '../styles/navigationStyles'
import Repos from './Repos/Repos'
import Repo from './Repos/Repo'
import DrawerLayout from './DrawerLayout'

class Trending extends Component {
  static navigationOptions = {
    title: 'Trending',
    header: null,
    ...navigationStyles
  }

  render() {
    const { navigation } = this.props
    return (
      <DrawerLayout title="Trending" navigation={navigation}>
        <Repos {...this.props} />
      </DrawerLayout>
    )
  }
}

const TrendingNavigator = createStackNavigator({
  Trending: {
    screen: Trending
  },
  Repo: {
    screen: Repo
  }
})

export default TrendingNavigator
