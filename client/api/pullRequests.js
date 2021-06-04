import { apiConfig } from "./apiConfig";

//helpers
const parsePullRequestsInfo = ( pullRequestsList ) => {
  const getPRStatus = ( pullRequest ) => {
    const { state, draft } = pullRequest
    if ( draft ) {
      return "draft"
    }
    return state
  }
  const getLabels = ( pullRequest ) => {
    return pullRequest.labels.map( label => label.name )
  }
  return pullRequestsList.map( pullRequest => {
    const { number: PRNumber, title, body: description, created_at: createdAt } = pullRequest
    const { login: userName, avatar_url: imgUrl } = pullRequest.user
    return {
      PRNumber,
      title,
      description,
      userName,
      imgUrl,
      createdAt,
      status: getPRStatus( pullRequest ),
      labels: getLabels( pullRequest )
    }
  } )
}

//api calls
const fetchPullRequestsList = async () => {
  const url = `${apiConfig.baseUrl}${apiConfig.endpoints.pullRequests}`
  return await fetch(url)
    .then( res => res.json() )
    .then( data => parsePullRequestsInfo( data )
    )
}

export const PullRequestsApi = {
  get: fetchPullRequestsList
}