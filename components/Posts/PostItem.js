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

export default class PostItem extends Component {
  render() {
    const { post } = this.props
    return (
      <Card style={styles.postItem}>
        <CardItem>
          <Grid>
            <Col
              style={{
                width: 90,
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <Thumbnail
                style={styles.thumbnail}
                square
                large
                source={{ uri: post.thumbnail }}
              />
            </Col>
            <Col size={2}>
              <CardItem
                style={{
                  flex: 1,
                  margin: 0,
                  padding: 0,
                  alignItems: 'flex-start'
                }}
              >
                <Text style={styles.title}>{post.title}</Text>
              </CardItem>
              <CardItem
                style={{
                  alignItems: 'flex-end',
                  marginTop: 5
                }}
              >
                <View style={styles.iconWrapper}>
                  <Icon style={styles.icon} type="Foundation" name="comment" />
                  <Text style={styles.iconText}>{post.num_comments}</Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Icon style={styles.icon} name="ios-heart" />
                  <Text style={styles.iconText}>{post.score}</Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Icon style={styles.icon} name="md-clock" />
                  <Text style={styles.iconText}>
                    {differenceInHours(new Date(), post.created_utc * 1000) +
                      'h'}
                  </Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Icon
                    style={styles.icon}
                    type="MaterialCommunityIcons"
                    name="dots-horizontal"
                  />
                </View>
              </CardItem>
            </Col>
            <Col
              style={{
                width: 50,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button
                style={{
                  height: 40,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                icon
                transparent
              >
                <Icon
                  style={{ color: '#7F7D8D' }}
                  type="Feather"
                  name="arrow-up"
                />
              </Button>
              <Button
                style={{
                  height: 40,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                icon
                transparent
              >
                <Icon
                  style={{ color: '#7F7D8D' }}
                  type="Feather"
                  name="arrow-down"
                />
              </Button>
            </Col>
          </Grid>
        </CardItem>
        <CardItem />
      </Card>
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
