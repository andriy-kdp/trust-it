import React                                from "react"
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";

export const MainLayout = ( { children, ...props } ) => {
  return <Box
    marginTop={ 8 }
    width={"100%"}
  >
    <AppBar>
      <Toolbar>
        <Typography variant="h6">Trust-IT</Typography>
      </Toolbar>
    </AppBar>
    <Box width={"99%"} position={"relative"}>
      { children }
    </Box>
    
  </Box>
}