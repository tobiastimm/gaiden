import gql from 'graphql-tag'

// = "language:? created:>2018-09-17 stars:>1"

export const GET_TRENDING_REPOS = gql`
  query getReposForQuery(
    $query: String!
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
