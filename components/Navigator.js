import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import Home from './Home'
import SideBar from './Sidebar'
import Trending from './Trending'
import Repo from './Repos/Repo'

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
