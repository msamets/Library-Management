import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ExampleComponent from '../components/ExampleComponent';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/example" element={<ExampleComponent />} />
    </Routes>
  );
};

export default AppRouter;
