import React, { useEffect, useState } from "react"
import { MainLayout }                 from "./MainLayout/MainLayout";
import { RequestsTableMain }          from "./RequestsTable/RequestsTableMain";
import { PullRequestsApi }            from "../api/pullRequests";

export const App = () => {
  //states
  const [ pullRequests, setPullRequests ] = useState( [] )
  
  const fetchPullRequestsList = async () => {
    const pullRequestsList = await PullRequestsApi.get()
    setPullRequests( pullRequestsList )
  }
  
  //get pull requests list when component mount
  useEffect( () => {
    fetchPullRequestsList()
  }, [] )
  
  return ( <MainLayout>
    { Boolean( pullRequests.length ) && <RequestsTableMain
      // columns={ tableColumns }
      rows={ pullRequests }
    /> }
  </MainLayout> )
}