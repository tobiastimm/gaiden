import gql from 'graphql-tag'
import { format, startOfWeek } from 'date-fns/esm'

export const GET_TRENDING_REPOS = gql`
  query getReposForQuery(
    $query: String = "language:? created:>2018-09-17 stars:>1"
    $first: Int = 10
    $after: String = null
  ) {
    search(first: $first, after: $after, type: REPOSITORY, query: $query) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
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
            updatedAt
          }
        }
      }
    }
  }
`

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
