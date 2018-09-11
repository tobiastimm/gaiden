import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Card,
  CardItem,
  ListItem,
  Text,
  Icon,
  Button,
  Thumbnail
} from 'native-base'
import { Col, Grid } from 'react-native-easy-grid'
import { differenceInHours } from 'date-fns/esm'

export default class Repo extends Component {
  render() {
    const { name } = this.props
    return (
      <ListItem>
        <Text style={{ color: '#000' }}>{name}</Text>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 10
  },
  title: {
    fontSize: 16
  },
  thumbnail: {
    borderRadius: 5
  },
  postItem: {
    padding: 10
  },
  iconWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 0,
    paddingBottom: 0
  },
  icon: {
    color: '#7F7D8D',
    fontSize: 22
  },
  iconText: {
    color: '#7F7D8D',
    fontSize: 12,
    marginLeft: -10,
    paddingRight: 10
  }
})
