import React, { Component } from 'react'
import { View } from 'react-native'
import { Icon, Text, Button } from 'native-base'
import { createStackNavigator } from 'react-navigation'
import navigationStyles from '../styles/navigationStyles'
import Repos from '../components/Repos/Repos'
import Repo from './Repo'
import DrawerLayout from '../components/Layout/DrawerLayout'
import TrendingSettings from './TrendingSettings'

class Trending extends Component {
  static navigationOptions = {
    title: 'Trending',
    header: null,
    ...navigationStyles
  }

  render() {
    const { navigation } = this.props
    return (
      <DrawerLayout
        title="Trending"
        navigation={navigation}
        right={() => (
          <Button
            onPress={() => navigation.navigate('TrendingSettings')}
            transparent
          >
            <Icon type="FontAwesome" name="cog" />
          </Button>
        )}
      >
        <Repos {...this.props} />
      </DrawerLayout>
    )
  }
}

const TrendingNavigator = createStackNavigator({
  Trending,
  TrendingSettings,
  Repo
})

export default TrendingNavigator
