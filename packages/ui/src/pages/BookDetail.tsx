import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Divider,
  Box,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { lendBook } from '../redux/slices/booksSlice';
import { RootState } from '../redux/store';
import LendBookModal from '../components/LendBookModal';
import '../assets/styles/BookDetail.scss';

interface User {
  id: number;
  name: string;
}

const mockUsers: User[] = [
  {
    id: 2,
    name: 'Enes Faruk Meniz',
  },
  {
    id: 1,
    name: 'Eray Aslan',
  },
  {
    id: 4,
    name: 'Kadir Mutlu',
  },
  {
    id: 3,
    name: 'Sefa Eren Şahin',
  },
];

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) =>
    state.books.books.find((b) => b.id === Number(bookId))
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // In a real app, fetch book data based on bookId
    // For demonstration, assume data is already in Redux store
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLendBook = (userId: number) => {
    dispatch(lendBook({ bookId: book.id, userId }));
    console.log(
      `Book "${book.name}" (ID: ${book.id}) has been lent to user ID: ${userId}`
    );
    handleCloseModal();
  };

  return (
    <Container maxWidth="sm" className="book-detail-container">
      <Typography className="page-title" gutterBottom>
        Book Detail
      </Typography>

      {/* Book Detail Card */}
      <Box className="book-detail-card">
        <Box className="book-info">
          <Typography>
            <span className="label">ID:</span>
            <span className="value">{book.id}</span>
          </Typography>
        </Box>
        <Divider />

        <Box className="book-info">
          <Typography>
            <span className="label">Name:</span>
            <span className="value">{book.name}</span>
          </Typography>
        </Box>
        <Divider />

        {book.score !== -1 && (
          <>
            <Box className="book-info">
              <Typography>
                <span className="label">Score:</span>
                <span className="value">{book.score}</span>
              </Typography>
            </Box>
            <Divider />
          </>
        )}
      </Box>

      <Box className="lend-button-container">
        <Button
          variant="contained"
          className="lend-button"
          onClick={handleOpenModal}
        >
          Lend the Book to a User
        </Button>
      </Box>

      <LendBookModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onLend={handleLendBook}
        users={mockUsers}
        bookName={book.name}
      />
    </Container>
  );
};

export default BookDetail;
