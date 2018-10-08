import gql from 'graphql-tag'

export const GET_REPO = gql`
  query getRepo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      descriptionHTML
      shortDescriptionHTML
      stargazers {
        totalCount
      }
      forks {
        totalCount
      }
      owner {
        login
        avatarUrl
      }
      primaryLanguage {
        name
        color
      }
      licenseInfo {
        key
      }
      watchers {
        totalCount
      }
      issues {
        totalCount
      }
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history {
              totalCount
            }
          }
        }
      }
      object(expression: "master:") {
        ... on Tree {
          entries {
            name
            type
            mode
            object {
              ... on Blob {
                isBinary
                byteSize
                text
              }
            }
          }
        }
      }
      createdAt
      updatedAt
      hasIssuesEnabled
      hasWikiEnabled
      homepageUrl
      isArchived
      isPrivate
      viewerHasStarred
      viewerCanSubscribe
    }
  }
`
