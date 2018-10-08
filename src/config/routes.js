import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import Home from '../screens/Home'
import SideBar from '../components/Sidebar'
import Trending from '../screens/Trending'

const Navigator = createDrawerNavigator(
  {
    Trending: { screen: Trending },
    Home: { screen: Home }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
)

export default Navigator
