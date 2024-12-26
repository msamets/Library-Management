import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppRouter />
      </Box>
    </Box>
  );
};

export default App;
