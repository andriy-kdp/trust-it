import React, { useEffect, useState } from "react"
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead, TablePagination,
  TableRow, Typography
}                           from "@material-ui/core";
import { RequestsTableRow } from "./RequestsTableRow";
import { SortButtons }      from "../../common/SortButtons";
import { FilterBubbles }    from "../../common/FilterBubbles";

export const RequestsTableMain = ( { columns, rows } ) => {
  //table state
  const [ tableRows, setTableRows ] = useState( [] )
  
  //pagination states
  const [ currentPage, setPage ] = useState( 0 )
  const [ rowsPerPage, setRowsPerPage ] = useState( 10 )
  
  //filter label states
  const [ filterLabelsList, setFilterLabelsList ] = useState( [] )
  const [ selectedLabels, setSelectedLabels ] = useState( [] )
  
  //filter status states
  const [ filterStatusList, setFilterStatusList ] = useState( [] )
  const [ selectedStatuses, setSelectedStatuses ] = useState( [] )
  
  
  //pagination handlers
  const handleChangePage = ( e, newPage ) => {
    setPage( newPage )
  }
  
  const handleChangeRowsPerPage = ( e ) => {
    setRowsPerPage( e.target.value )
    setPage( 0 )
  }
  
  //labels handlers
  const handleSelectLabel = ( label ) => {
    const isLabelExists = selectedLabels.includes( label )
    if ( !isLabelExists ) {
      return setSelectedLabels( prev => [ ...prev, label ] )
    }
    setSelectedLabels( prev => prev.filter( oldLabel => oldLabel !== label ) )
  }
  
  const handleClearLabelFilter = () => {
    setSelectedLabels( [] )
  }
  
  //status handlers
  const handleSelectStatus = ( status ) => {
    const isStatusExists = selectedStatuses.includes( status )
    if ( !isStatusExists ) {
      return setSelectedStatuses( prev => [ ...prev, status ] )
    }
    setSelectedStatuses( prev => prev.filter( oldStatus => oldStatus !== status ) )
  }
  
  const handleClearStatusList = () => {
    setSelectedStatuses( [] )
  }
  
  //filter rows data, if no selected labels & statuses returns props.rows array
  const quickFilter = () => {
    let newTableRows = [ ...rows ]
    if ( selectedLabels.length ) {
      newTableRows = newTableRows.filter( row => selectedLabels.every( label => row.labels.includes( label ) ) )
    }
    if ( selectedStatuses.length ) {
      newTableRows = newTableRows.filter( row => selectedStatuses.includes( row.status ) )
    }
    setTableRows( newTableRows )
  }
  
  //sort functions
  const sortByPr = ( type ) => {
    if ( type === "asc" ) {
      return setTableRows( [ ...tableRows ].sort( ( a, b ) => a.PRNumber - b.PRNumber ) )
    }
    setTableRows( [ ...tableRows ].sort( ( a, b ) => b.PRNumber - a.PRNumber ) )
  }
  
  const sortByTitle = ( type ) => {
    if ( type === "asc" ) {
      return setTableRows( [ ...tableRows ].sort( ( a, b ) => a.title.localeCompare( b.title ) ) )
    }
    setTableRows( [ ...tableRows ].sort( ( a, b ) => b.title.localeCompare( a.title ) ) )
  }
  
  const tableColumns = [
    { field: "_buttons" },
    { field: "PRNumber", headerName: "#PR", sortButtons: true, sortFn: sortByPr },
    { field: "author", headerName: "Author" },
    { field: "title", headerName: "Title", sortButtons: true, sortFn: sortByTitle },
    { field: "status", headerName: "Status" },
    { field: "createdAt", headerName: "Creation date" }
  ]
  
  //generate filter chips based on current table state
  useEffect( () => {
    if ( rows ) {
      const labelsSet = new Set()
      const statusesSet = new Set()
      const labels = []
      const statuses = []
      
      tableRows.forEach( row => {
        statusesSet.add( row.status )
        row.labels.forEach( label => labelsSet.add( label ) )
      } )
      
      for ( let label of labelsSet ) {
        labels.push( label )
      }
      for ( let status of statusesSet ) {
        statuses.push( status )
      }
      setFilterStatusList( statuses.sort() )
      setFilterLabelsList( labels.sort() )
    }
  }, [ tableRows ] )
  
  //set rows to local component state
  useEffect( () => {
    if ( rows ) {
      setTableRows( rows )
    }
  }, [] )
  
  useEffect( () => quickFilter(), [ selectedStatuses, selectedLabels ] )
  
  return (
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 } sm={ 2 }>
        <Box marginTop={ 3 }>
          <FilterBubbles list={ filterLabelsList } selected={ selectedLabels } onSelect={ handleSelectLabel }
                         onClear={ handleClearLabelFilter } title={ "Quick label filter" }/>
          
          <FilterBubbles list={ filterStatusList } selected={ selectedStatuses } onSelect={ handleSelectStatus }
                         onClear={ handleClearStatusList } title={ "Filter by status" }/>
        </Box>
      
      </Grid>
      <Grid item xs={ 12 } sm={ 10 }>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                { tableColumns.map( ( column ) => (
                  <TableCell
                    key={ column.field }
                  >
                    <Box display={ "flex" } alignItems={ "center" }>
                      { column.sortButtons && <SortButtons sortBy={ column.sortFn }/> }
                      <Typography variant={ "caption" }>
                        { column.headerName }
                      </Typography>
                    </Box>
                  </TableCell>
                ) ) }
              </TableRow>
            </TableHead>
            <TableBody>
              { tableRows
                .slice( currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage )
                .map( ( row ) => <RequestsTableRow row={ row }
                                                   descriptionWidth={ tableColumns.length }
                                                   key={ row.PRNumber }/> ) }
            < /TableBody>
          </Table>
        </TableContainer>
        <TablePagination count={ tableRows.length }
                         onChangePage={ handleChangePage }
                         page={ currentPage }
                         rowsPerPage={ rowsPerPage }
                         rowsPerPageOptions={ [ 5, 10, 15 ] }
                         component={ "div" }
                         onChangeRowsPerPage={ handleChangeRowsPerPage }/>
      </Grid>
    </Grid>
  
  
  )
}