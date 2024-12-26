import React, { useEffect } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import BookList from '../components/BookList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, selectBooks, selectBooksLoading, selectBooksError } from '../redux/slices/booksSlice';
import { AppDispatch, RootState } from '../store';

const Books: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector(selectBooks);
  const loading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (error) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Books
      </Typography>
      <BookList books={books} loading={loading} />
    </Container>
  );
};

export default Books;
