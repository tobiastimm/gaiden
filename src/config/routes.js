import React from 'react'
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation'
import { View } from 'react-native'
import Home from '../screens/Home'
import SideBar from '../components/Sidebar'
import Trending from '../screens/Trending'
import AuthLoading from '../screens/AuthLoading'
import Login from '../screens/Login'
import { getToken } from '../lib/loginUtils'
import { withApollo } from 'react-apollo'

const AuthStack = createStackNavigator({ SignIn: Login })

const AppStack = createDrawerNavigator(
  {
    Trending: { screen: Trending },
    Home: { screen: Home }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
)

export default createSwitchNavigator(
  {
    AuthLoading,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)
