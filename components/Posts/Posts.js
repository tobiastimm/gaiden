import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Container, List, Card, CardItem, Body, Text } from 'native-base'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import PostItem from './PostItem'

export const GET_POSTS = gql`
  query getAllPosts($subreddit: String!, $limit: Int!) {
    subreddit(subreddit: $subreddit, limit: $limit)
      @rest(
        type: "Subreddit"
        path: "r/{args.subreddit}/top.json?limit={args.limit}"
      ) {
      data @type(name: "Posts") {
        children @type(name: "[Post]") {
          data @type(name: "PostData") {
            id
            title
            author_fullname
            thumbnail
            score
            url
            permalink
            created_utc
            num_comments
          }
        }
      }
    }
  }
`

export default class Posts extends Component {
  render() {
    return (
      <Query
        query={GET_POSTS}
        variables={{
          subreddit: 'reactjs',
          limit: 5
        }}
      >
        {({ loading, data: { subreddit } }) => {
          if (loading) return <ActivityIndicator size="large" />
          const {
            data: { children: posts }
          } = subreddit
          return (
            <List
              dataArray={posts}
              renderRow={({ data: post }) => <PostItem post={post} />}
            />
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  mb: {
    marginBottom: 15,
    padding: 10
  }
})
