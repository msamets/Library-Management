import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Divider,
    Box,
    Button,
} from '@mui/material';
import '../assets/styles/UserDetail.scss';

// Mock user data till connection API
const mockUserResponse = {
  id: 2,
  name: 'Enes Faruk Meniz',
  books: {
    past: [
      {
        name: 'I, Robot',
        userScore: 5,
      },
      {
        name: "The Hitchhiker's Guide to the Galaxy",
        userScore: 10,
      },
    ],
    present: [
      {
        name: 'Brave New World',
      },
    ],
  },
};

const UserDetail: React.FC = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    setUserData(mockUserResponse);
  }, [userId]);

  const handleReturn = (book: any) => {
    console.log(`Returning book: ${book.name}`);
  };

  if (!userData) {
    return <div>Loading...</div>;
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
            <span className="value">{userData.id}</span>
          </Typography>
          <Typography>
            <span className="label">Name:</span>{' '}
            <span className="value">{userData.name}</span>
          </Typography>
        </div>

        <Divider />

        <div className="books-section">
          <Typography className="section-title" variant="subtitle1">
            Past Books
          </Typography>
          {userData.books?.past?.length > 0 ? (
            userData.books.past.map((book: any, index: number) => (
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
          {userData.books?.present?.length > 0 ? (
            userData.books.present.map((book: any, index: number) => (
              <Box key={index} className="book-item">
                <Typography className="book-name">{book.name}</Typography>
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
    </Container>
  );
};

export default UserDetail;
