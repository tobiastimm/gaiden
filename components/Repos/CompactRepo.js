import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Text, Icon, Button, Thumbnail } from 'native-base'
import { Col, Grid, Row } from 'react-native-easy-grid'

export default class CompactRepo extends Component {
  render() {
    const {
      name,
      description,
      stargazers,
      forks,
      owner,
      watchers,
      primaryLanguage
    } = this.props
    return (
      <View>
        <ListItem style={styles.listItem}>
          <Grid>
            <Row style={{ marginBottom: 5 }}>
              <Col size={0.8 / 4} style={styles.thumbnailContainer}>
                <Thumbnail
                  square
                  style={styles.thumbnail}
                  source={{ uri: owner.avatarUrl }}
                />
              </Col>
              <Col size={3.2 / 4}>
                <Row>
                  <Text style={styles.title}>
                    {owner.login} / {name}
                  </Text>
                </Row>
                <Row>
                  <Text style={styles.description}>{description}</Text>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col size={1.5 / 6}>
                <View style={styles.iconContainer}>
                  <Icon style={styles.icon} name="star-o" type="FontAwesome" />
                  <Text style={styles.iconText}>{stargazers.totalCount}</Text>
                </View>
              </Col>
              <Col size={1.5 / 6}>
                <View style={styles.iconContainer}>
                  <Icon
                    style={styles.icon}
                    name="code-fork"
                    type="FontAwesome"
                  />
                  <Text style={styles.iconText}>{forks.totalCount}</Text>
                </View>
              </Col>
              <Col size={1.5 / 6}>
                <View style={styles.iconContainer}>
                  <Icon style={styles.icon} name="eye" type="FontAwesome" />
                  <Text style={styles.iconText}>{watchers.totalCount}</Text>
                </View>
              </Col>
              <Col size={2 / 6}>
                {primaryLanguage && (
                  <View style={styles.iconContainer}>
                    <Icon
                      name="globe"
                      type="FontAwesome"
                      style={{
                        fontSize: 20,
                        marginRight: 5,
                        color: primaryLanguage.color
                      }}
                    />
                    <Text
                      style={{
                        color: primaryLanguage.color
                      }}
                    >
                      {primaryLanguage.name}
                    </Text>
                  </View>
                )}
              </Col>
            </Row>
          </Grid>
        </ListItem>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {},
  thumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  thumbnail: {
    borderRadius: 3
  },
  description: {
    marginTop: 5,
    color: '#b5b5b5'
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
    color: '#b5b5b5'
  },
  iconText: {
    color: '#b5b5b5'
  },
  listItem: {
    marginLeft: 0,
    padding: 10,
    marginBottom: 10,
    shadowColor: 'rgba(0,0,0,0.12)',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  iconWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 0,
    paddingBottom: 0
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
