// React
import React, { useState } from 'react';
// Material UI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Internal files
import ShoeCard from './Cards';


export default function App() {
  // Declaring the state
  const [value, setValue] = useState('1');

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList 
              value={value}
              onChange={handleChange} 
              indicatorColor='secondary'
              textColor='inherit'
            >
              <Tab label='New Arrivals' value='1' />
              <Tab label='Best of Adidas' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'><ShoeCard /></TabPanel>
          <TabPanel value='2'>BEST BEST BEST</TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}
