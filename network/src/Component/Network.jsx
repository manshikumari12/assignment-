import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Container,
  Box,
  CssBaseline,
} from '@mui/material';
import DataTable from './DataTable';
import Details from './Details';

const Network = () => {
  const [url, setUrl] = useState('');
  const [filter, setFilter] = useState(['All']);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);


  const handleSearch = () => {
    if (!url) return;

    let formattedUrl = url;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const startTime = Date.now();

    axios
      .get(`http://localhost:1212/network-data?url=${encodeURIComponent(formattedUrl)}`)
      .then((response) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        setRequests((prevRequests) => [
          ...prevRequests,
          {
            url: response.config.url,
            method: response.config.method,
            status: response.status,
            statusText: response.statusText,
            duration,
            headers: response.config.headers,
            data: response.data,
          },
        ]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const filteredRequests = requests.filter((req) => {
    if (filter.includes('All')) return true;
    return filter.some((f) => req.url.includes(f.toLowerCase()));
  });

  const handleFilterChange = (event, newFilters) => {
    if (newFilters !== null) {
      setFilter(newFilters);
    }
  };

  const handleRowClick = (req) => {
    setSelectedRequest(req);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#212121', 
        minHeight: '100vh',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg" style={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
          Network Requests
        </Typography>
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          margin="dense"
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '20px' }}
        >
          Search
        </Button>
        <ToggleButtonGroup
          value={filter}
          onChange={handleFilterChange}
          aria-label="Filter by"
          style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
        >
          <ToggleButton value="All" style={{ color: 'white', borderColor: 'white' }}>
            All
          </ToggleButton>
          <ToggleButton value="Doc" style={{ color: 'white', borderColor: 'white' }}>
            Doc
          </ToggleButton>
          <ToggleButton value="XHR" style={{ color: 'white', borderColor: 'white' }}>
            XHR
          </ToggleButton>
          <ToggleButton value="JS" style={{ color: 'white', borderColor: 'white' }}>
            JS
          </ToggleButton>
          <ToggleButton value="CSS" style={{ color: 'white', borderColor: 'white' }}>
            CSS
          </ToggleButton>
          <ToggleButton value="Font" style={{ color: 'white', borderColor: 'white' }}>
            Font
          </ToggleButton>
          <ToggleButton value="Img" style={{ color: 'white', borderColor: 'white' }}>
            Img
          </ToggleButton>
          <ToggleButton value="Media" style={{ color: 'white', borderColor: 'white' }}>
            Media
          </ToggleButton>
          <ToggleButton value="Manifest" style={{ color: 'white', borderColor: 'white' }}>
            Manifest
          </ToggleButton>
          <ToggleButton value="WS" style={{ color: 'white', borderColor: 'white' }}>
            WS
          </ToggleButton>
          <ToggleButton value="Wasm" style={{ color: 'white', borderColor: 'white' }}>
            Wasm
          </ToggleButton>
        </ToggleButtonGroup>
        <DataTable requests={filteredRequests} onRowClick={handleRowClick} />
        <Details open={Boolean(selectedRequest)} onClose={handleCloseDetails} request={selectedRequest} />
      </Container>
    </Box>
  );
};
export default Network;
