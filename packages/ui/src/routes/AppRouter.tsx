import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ExampleComponent from '../components/ExampleComponent';
import Users from '../pages/Users';
import Books from '../pages/Books';
import UserDetail from '../pages/UserDetail';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/example" element={<ExampleComponent />} />
      <Route path="/users" element={<Users />} />
      <Route path="/books" element={<Books />} />
      <Route path="/users/:userId" element={<UserDetail />} />
    </Routes>
  );
};

export default AppRouter;
