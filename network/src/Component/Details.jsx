import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const Details = ({ on, close, req }) => {
  if (!req) return null;

  return (
    <Dialog on={on} close={close}>
      <DialogTitle>request Details</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1"><strong>URL:</strong> {req.url}</Typography>
        <Typography variant="body1"><strong>Method:</strong> {req.method}</Typography>
        <Typography variant="body1"><strong>Status:</strong> {req.status}</Typography>
        <Typography variant="body1"><strong>Duration:</strong> {req.duration} ms</Typography>
        <Typography variant="body1"><strong>Headers:</strong> <pre>{JSON.stringify(req.headers, null, 2)}</pre></Typography>
        <Typography variant="body1"><strong>Data:</strong> <pre>{JSON.stringify(req.data, null, 2)}</pre></Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Details;
