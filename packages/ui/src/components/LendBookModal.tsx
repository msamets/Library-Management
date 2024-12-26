// src/components/LendBookModal.tsx

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { User } from '../services/userService';

interface LendBookModalProps {
  open: boolean;
  onClose: () => void;
  users: User[];
  bookName: string;
}

const LendBookModal: React.FC<LendBookModalProps> = ({
  open,
  onClose,
  onLend,
  users,
  bookName,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');

  const handleLend = () => {
    if (selectedUserId !== '') {
      onLend(selectedUserId);
      setSelectedUserId('');
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedUserId('');
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="lend-book-dialog">
      <DialogTitle id="lend-book-dialog">Lend "{bookName}" to a User</DialogTitle>
      <DialogContent>
        {users.length === 0 ? (
          <Typography>No users available to lend the book.</Typography>
        ) : (
          <FormControl fullWidth>
            <InputLabel id="select-user-label">Select User</InputLabel>
            <Select
              labelId="select-user-label"
              value={selectedUserId}
              label="Select User"
              onChange={(e) => setSelectedUserId(e.target.value as number | '')}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleLend}
          variant="contained"
          color="primary"
          disabled={selectedUserId === ''}
        >
          Lend Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LendBookModal;
