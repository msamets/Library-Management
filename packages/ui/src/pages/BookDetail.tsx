import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Divider,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Label,
  FormControl,
} from '@mui/material';
import '../assets/styles/BookDetail.scss';

const mockBookResponse = {
  id: 2,
  name: 'I, Robot',
  score: '5.33',
};

const mockUsers = [
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
  const { bookId } = useParams();
  const [bookData, setBookData] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');

  //TODO: create custom modal component for it and take modal to there and call it in here
  useEffect(() => {
    setBookData(mockBookResponse);
  }, [bookId]);

  if (!bookData) {
    return <div>Loading...</div>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId('');
  };

  const handleLendBook = () => {
    if (selectedUserId !== '') {
      const selectedUser = mockUsers.find((user) => user.id === selectedUserId);

      console.log(
        `Book "${bookData.name}" (ID: ${bookData.id}) has been lent to ${selectedUser?.name} (ID: ${selectedUser?.id})`
      );

      handleCloseModal();
    }
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
            <span className="value">{bookData.id}</span>
          </Typography>
        </Box>
        <Divider />

        <Box className="book-info">
          <Typography>
            <span className="label">Name:</span>
            <span className="value">{bookData.name}</span>
          </Typography>
        </Box>
        <Divider />

        <Box className="book-info">
          <Typography>
            <span className="label">Score:</span>
            <span className="value">{bookData.score}</span>
          </Typography>
        </Box>
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

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        className="lend-modal"
      >
        <DialogTitle>Select a User to Lend the Book</DialogTitle>

        <DialogContent className="modal-content">
          <FormControl fullWidth>
            <Typography variant="h6">User</Typography>
            <Select
              value={selectedUserId}
              displayEmpty
              onChange={(e) =>
                setSelectedUserId(e.target.value as number | '')
              }
            >
              {mockUsers.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className="modal-actions">
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleLendBook}
            variant="contained"
            color="primary"
            disabled={selectedUserId === ''}
          >
            Lend Book
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookDetail;
