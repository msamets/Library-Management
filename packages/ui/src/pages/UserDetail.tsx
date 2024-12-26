import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Divider,
  Box,
  Button,
  CircularProgress,
  Alert,
  TextField,
  Snackbar,
} from '@mui/material';
import userService from '../services/userService';
import '../assets/styles/UserDetail.scss';

const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [scores, setScores] = useState<{ [key: number]: string }>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const fetchUserDetail = async () => {
    try {
      if (userId) {
        const fetchedData = await userService.getUserDetail(Number(userId));
        setUser(fetchedData);
      }
    } catch (err: any) {
      console.error('Error fetching user details:', err);
      setError(err.response?.data?.error || 'Failed to fetch user details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, [userId]);

  const handleReturn = async (book: any) => {
    if (!userId) return;

    try {
      const score = scores[book.id] ? Number(scores[book.id]) : undefined;

      await userService.returnBook(Number(userId), book.id, score);

      setSnackbar({
        open: true,
        message: `Book "${book.name}" returned successfully!`,
        severity: 'success',
      });

      await fetchUserDetail();
    } catch (err: any) {
      console.error(`Failed to return book: ${book.name}`, err);
      setSnackbar({
        open: true,
        message: `Failed to return the book "${book.name}".`,
        severity: 'error',
      });
    }
  };

  const handleScoreChange = (bookId: number, value: string) => {
    setScores((prevScores) => ({
      ...prevScores,
      [bookId]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Container maxWidth="md" className="user-detail-container">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="user-detail-container">
      <Typography className="page-title" gutterBottom>
        User Detail
      </Typography>

      <div className="user-detail-card">
        <div className="user-info">
          <Typography>
            <span className="label">ID:</span>{' '}
            <span className="value">{user.id}</span>
          </Typography>
          <Typography>
            <span className="label">Name:</span>{' '}
            <span className="value">{user.name}</span>
          </Typography>
        </div>

        <Divider />

        <div className="books-section">
          <Typography className="section-title" variant="subtitle1">
            Past Books
          </Typography>
          {user.books?.past?.length > 0 ? (
            user.books.past.map((book: any, index: number) => (
              <div key={index} className="book-item">
                <Typography className="book-name">{book.name}</Typography>
                <Typography className="book-score">
                  Score: {book.userScore}
                </Typography>
              </div>
            ))
          ) : (
            <Typography>No past books</Typography>
          )}
        </div>

        <Divider />

        <Box className="books-section">
          <Typography className="section-title" variant="subtitle1">
            Present Books
          </Typography>
          {user.books?.present?.length > 0 ? (
            user.books.present.map((book: any, index: number) => (
              <Box key={index} className="book-item">
                <Typography className="book-name">{book.name}</Typography>
                <TextField
                  size="small"
                  label="Score"
                  type="number"
                  value={scores[book.id] || ''}
                  onChange={(e) => handleScoreChange(book.id, e.target.value)}
                  sx={{ marginRight: 2 }}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleReturn(book)}
                >
                  Return Book
                </Button>
              </Box>
            ))
          ) : (
            <Typography>No present books</Typography>
          )}
        </Box>
      </div>

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

export default UserDetail;
