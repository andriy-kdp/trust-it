import { Box, Chip, Typography } from "@material-ui/core";
import React                     from "react";

export const FilterBubbles = ( { list, selected, onSelect, onClear, title }) => {
  return <Box mt={2}>
    <Box marginBottom={ 2 }>
      <Typography variant={ "h3" }>
        {title}:
      </Typography>
    </Box>
    { list.map( label =>
      <Chip label={ label } size={ "small" } color={ "primary" }
            variant={ selected.includes( label ) ? "default" : "outlined" } key={ label }
            onClick={ () => onSelect( label ) } style={ { margin: "1px" } }/>
    ) }
    { Boolean( selected.length ) &&
    <Box mt={ 1 }>
      <Chip label={ "Reset filter" } onClick={ onClear } variant={ "outlined" } size={ "small" }
            color={ "secondary" }/>
    </Box> }
  </Box>
}