import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { increment } from '../redux/slices/exampleSlice';
import { Button } from '@mui/material';

const ExampleComponent: React.FC = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.example.value);

  const handleIncrement = () => {
    dispatch(increment());
  };

  return (
    <div>
      <h2>Example Component</h2>
      <p>Value: {value}</p>
      <Button variant="contained" color="primary" onClick={handleIncrement}>
        Increment
      </Button>
    </div>
  );
};

export default ExampleComponent;
