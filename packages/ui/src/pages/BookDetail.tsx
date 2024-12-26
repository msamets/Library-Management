import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Divider,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import LendBookModal from '../components/LendBookModal';
import bookService, { BookDetailWithBorrows } from '../services/bookService';
import userService, { User } from '../services/userService';
import '../assets/styles/BookDetail.scss';

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<BookDetailWithBorrows | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]); // State for users
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        if (bookId) {
          const detail = await bookService.getBookDetailWithBorrows(Number(bookId));
          setBook(detail);
        }
      } catch (error: any) {
        console.error('Error fetching book detail:', error);
        setSnackbar({
          open: true,
          message: error.response?.data?.error || 'Failed to fetch book details.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [bookId]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await userService.listAllUsers();
      setUsers(fetchedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Failed to fetch users.',
        severity: 'error',
      });
    }
  };

  const handleOpenModal = async () => {
    await fetchUsers();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLendBook = async (userId: number) => {
    try {
      const response = await userService.borrowBook(userId, book.id);
      setSnackbar({
        open: true,
        message: response.message || 'Book successfully lent!',
        severity: 'success',
      });

      const updatedDetail = await bookService.getBookDetailWithBorrows(book.id);
      setBook(updatedDetail);
    } catch (error: any) {
      console.error('Error lending the book:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Failed to lend the book.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Container maxWidth="sm" className="book-detail-container">
        <CircularProgress />
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="sm" className="book-detail-container">
        <Typography variant="h6">Book not found.</Typography>
      </Container>
    );
  }

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

        <Box className="book-info">
          <Typography>
            <span className="label">Author:</span>
            <span className="value">{book.author}</span>
          </Typography>
        </Box>
        <Divider />

        {book.publishedYear && (
          <Box className="book-info">
            <Typography>
              <span className="label">Published Year:</span>
              <span className="value">{book.publishedYear}</span>
            </Typography>
          </Box>
        )}

        {book.borrows.length > 0 && (
          <Box className="book-info">
            <Typography variant="h6">Borrows:</Typography>
            <List>
              {book.borrows.map((borrow) => (
                <ListItem key={borrow.id}>
                  <ListItemText
                    primary={`Borrow ID: ${borrow.id}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Borrowed User: {`${borrow.user.name} #${borrow.user.id}`}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Borrowed At: {new Date(borrow.borrowedAt).toLocaleString()}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Returned At:{' '}
                          {borrow.returnedAt
                            ? new Date(borrow.returnedAt).toLocaleString()
                            : 'Not Returned'}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        onClick={handleOpenModal}
        disabled={book.borrows.some((borrow) => !borrow.returnedAt)}
      >
        Lend the Book to a User
      </Button>

      <LendBookModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onLend={handleLendBook}
        users={users}
        bookName={book.name}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookDetail;
