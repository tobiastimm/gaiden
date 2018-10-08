import { GET_TRENDING_REPOS } from '../api/getTrendingRepos'
import getTrendingRepoData from '../../data/getTrendingRepo.json'

export function addCache(client) {
  client.writeQuery({
    query: GET_TRENDING_REPOS,
    data: getTrendingRepoData.data.search
  })
}
