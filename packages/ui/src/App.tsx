import React from 'react';
import AppRouter from './routes/AppRouter';
import { Container } from '@mui/material'; // Example MUI usage

const App: React.FC = () => {
  return (
    <Container>
      <h1>My React + TS + MUI App</h1>
      <AppRouter />
    </Container>
  );
};

export default App;
