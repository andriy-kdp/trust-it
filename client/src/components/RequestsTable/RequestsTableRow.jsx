import React, { useState } from "react"
import {
  Avatar,
  Box, Chip,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  Tooltip,
  Typography
}                          from "@material-ui/core";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import KeyboardArrowDownIcon
  from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles( theme => ( {
  avatarImage: {
    width: theme.spacing( 3 ),
    height: theme.spacing( 3 )
  },
  chip: {
    margin: theme.spacing(0,0.5)
  }
} ) )

export const RequestsTableRow = ( { row, descriptionWidth } ) => {
  const [ isOpen, setOpen ] = useState( false )
  
  const classes = useStyles()
  
  const toggleOpenDescription = () => {
    setOpen( prev => !prev )
  }
  
  return (
    <>
      <TableRow key={ row.PRNumber }>
        <TableCell padding={ "checkbox" }>
          <Tooltip title={ "Show description" }>
            <IconButton onClick={ toggleOpenDescription } size={ "small" }>
              { isOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell padding={ "none" } align={"center"}>
          { row.PRNumber }
        </TableCell>
        <TableCell padding={"none"}>
          <Box display={ "flex" } justifyContent={ "flex-start" } alignItems={ "center" }>
            <Box mr={ 1 }>
              <Avatar alt={ row.userName } src={ row.imgUrl } className={ classes.avatarImage }/>
            </Box>
            <Typography variant={ "caption" }> { row.userName }   </Typography>
          </Box>
        </TableCell>
        <TableCell padding={ "none" }>
          { row.title }
        </TableCell>
        <TableCell padding={ "none" }>
          { row.status }
        </TableCell>
        <TableCell padding={ "none" }>
          { new Date( row.createdAt ).toLocaleString() }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={descriptionWidth} padding={"none"}>
          <Box display={ "flex" } my={0.5} alignItems={"center"} px={1} justifyContent={"flex-end"}>
            { row.labels.map( label => <Chip key={label} label={ label } size={"small"} variant={"default"} className={classes.chip}/> ) }
          </Box>
        </TableCell>
      </TableRow>
      { isOpen && <TableRow>
        <TableCell colSpan={ descriptionWidth }>
          <Typography variant={ "caption" }>
            { row.description }
          </Typography>
        </TableCell>
      </TableRow> }
    </>
  )
}