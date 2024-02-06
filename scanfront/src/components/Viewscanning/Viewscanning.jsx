// ViewScanning.jsx

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Editscanning from '../Editscanning/Editscanning';
import './Viewscanning.css'; 
import axios from 'axios';
import baseUrl from '../../Api';
import { useNavigate } from 'react-router-dom';
import Adsidebar from '../Navbar/Adsidebar';
import Adnavbar from '../Navbar/Adnavbar';
import Loader from '../Loader';

const ViewScanning = () => {
  var [scans, setScans] = useState([]);
  var [selected, setSelected] = useState();
  var [update, setUpdate] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    axios.get(baseUrl + "/scan/scanview")
      .then(response => {
        console.log(response.data)
        setScans(response.data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoader(false); 
      });
  }, []);

  const deletevalues = (id) => {
    setLoader(true); 
    console.log("deleted", id)
    axios.put(baseUrl + "/scan/updatestatus/" + id)
      .then((response) => {
        setLoader(false); 
        alert("Changed")
        window.location.reload(false);
      })
      .catch(err => {
        setLoader(false); 
        console.log(err);
      });
  }

  const updatevalues = (value) => {
    setLoader(true);
    console.log("updated", value);
    setSelected(value);
    setUpdate(true);
    setLoader(false); 
  }

  var result = (
    <div>
      {loader && <Loader/>}
      <Adnavbar/>
      <Box height={20}>
        <Box sx={{ display: 'flex' }}>
          <Adsidebar/>
          <Grid className='grid-container'>
            <Paper elevation={10} className='paperstyle'>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography> Scanning View</Typography>
                <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Scanning ID</TableCell>
                        <TableCell>Scanning Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Change Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scans.map((value, index) => (
                        <TableRow key={index}>
                          <TableCell>{value.sid}</TableCell>
                          <TableCell>{value.sname}</TableCell>
                          <TableCell>{value.sdescription}</TableCell>
                          <TableCell>{value.samount}</TableCell>
                          <TableCell><EditIcon onClick={() => updatevalues(value)} /><Button type='submit' onClick={() => { navigate('/editscan'); }}></Button></TableCell>
                          <TableCell><Button onClick={() => deletevalues(value._id)}>Change</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </div>
  );

  if (update) {
    result = <Editscanning data={selected} method='put' />;
  }

  return result;
}

export default ViewScanning;
