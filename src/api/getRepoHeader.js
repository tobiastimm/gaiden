import gql from 'graphql-tag'

export const GET_REPO_HEADER = gql`
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
      repositoryTopics(first: 5) {
        edges {
          node {
            topic {
              id
              name
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
      diskUsage
    }
  }
`
