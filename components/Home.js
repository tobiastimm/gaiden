import React, { Component } from 'react'
import {
  Container,
  Button,
  Title,
  Left,
  Right,
  Body,
  Header,
  Icon,
  StyleProvider
} from 'native-base'
import { StyleSheet } from 'react-native'
import navigationStyles from '../styles/navigationStyles'
import Repos from './Repos/Repos'
import DrawerLayout from './DrawerLayout'

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    ...navigationStyles
  }

  render() {
    const { navigation } = this.props
    return (
      <DrawerLayout title={'Home'} navigation={navigation}>
        <Repos />
      </DrawerLayout>
    )
  }
}

const styles = StyleSheet.create({})
