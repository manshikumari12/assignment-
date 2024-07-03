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
  CircularProgress,
  Alert,
} from '@mui/material';
import DataTable from './DataTable';
import Details from './Details';

const Network = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['All']);
  const [networkRequests, setNetworkRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const handleSearchMain = () => {
    if (!inputUrl) return;

    setIsLoading(true);
    setFetchError(null);

    let formattedUrl = inputUrl;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const startTime = Date.now();

    axios
      .get(`https://backendapp-n2d5.onrender.com/network-data?url=${encodeURIComponent(formattedUrl)}`)
      .then((response) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        setNetworkRequests((prevRequests) => [
          ...prevRequests,
          {
            url: formattedUrl,
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
        setFetchError('Error fetching data. Please check the URL and try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const filteredRequests = networkRequests.filter((req) => {
    if (selectedFilters.includes('All')) return true;
    return selectedFilters.some((f) => req.url.toLowerCase().includes(f.toLowerCase()));
  });

  const handleFilterChange = (event, newFilters) => {
    if (newFilters !== null) {
      setSelectedFilters(newFilters);
    }
  };

  const handleRowClick = (req) => {
    setCurrentRequest(req);
  };

  const handleCloseDetails = () => {
    setCurrentRequest(null);
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
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: '20px' }}>
          Network Requests
        </Typography>
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          margin="dense"
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchMain}
          sx={{ marginLeft: '10px', marginTop: '10px', marginBottom: '20px' }}
          disabled={isLoading}
        >
          Search
        </Button>
        {isLoading && <CircularProgress sx={{ color: 'white', marginBottom: '20px' }} />}
        {fetchError && <Alert severity="error" sx={{ marginBottom: '20px' }}>{fetchError}</Alert>}
        <ToggleButtonGroup
          value={selectedFilters}
          onChange={handleFilterChange}
          aria-label="Filter by"
          sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {['All', 'Doc', 'XHR', 'JS', 'CSS', 'Font', 'Img', 'Media', 'Manifest', 'WS', 'Wasm'].map((type) => (
            <ToggleButton key={type} value={type} sx={{ color: 'white', borderColor: 'white' }}>
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <DataTable requests={filteredRequests} onRowClick={handleRowClick} />
        <Details open={Boolean(currentRequest)} onClose={handleCloseDetails} request={currentRequest} />
      </Container>
    </Box>
  );
};

export default Network;
