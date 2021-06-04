import { Box, IconButton } from "@material-ui/core";
import KeyboardArrowUpIcon       from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon     from "@material-ui/icons/KeyboardArrowDown";
import React                     from "react";

const variant = {
  asc: "asc",
  desc: "desc"
}

export const SortButtons = ({sortBy}) => {
  const handleSortAsc = () => {
    sortBy(variant.asc)
  }
  const handleSortDesc = () => {
    sortBy(variant.desc)
  }
  
  return (
    <Box>
      <IconButton size={"small"} onClick={handleSortAsc}>
        <KeyboardArrowUpIcon fontSize={"small"} />
      </IconButton>
      <IconButton size={"small"} onClick={handleSortDesc}>
        <KeyboardArrowDownIcon fontSize={"small"}/>
      </IconButton>
    </Box>
  )
}