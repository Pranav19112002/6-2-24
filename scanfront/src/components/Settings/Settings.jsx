import React from 'react'
import Adnavbar from '../Navbar/Adnavbar'
import { Box, Grid, Paper } from '@mui/material'
import Adsidebar from '../Navbar/Adsidebar'

const Settings = () => {
  return (
    <div>
      <Adnavbar />
      <Box height={20}>
        <Box sx={{ display: 'flex' }}>
          <Adsidebar />
          <Grid className='grid-container'>
            <Paper elevation={10} className='paperstyle'>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>

    </div>
  )
}

export default Settings