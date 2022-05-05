import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';



import ShoeCard from './Cards';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function App() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

 

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };


  return (
    <Container>
      <Box sx={{ bgcolor: 'background.paper', width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab label="New Arrivals" {...a11yProps(0)} />
            <Tab label="Best of Adidas" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0} dir={theme.direction}>
            
              <ShoeCard />
              
            
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            BEST BEST BEST
          </TabPanel>
      </Box>

    

    </Container>
  );
}
