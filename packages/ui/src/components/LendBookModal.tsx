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
} from '@mui/material';
import '../assets/styles/LendBookModal.scss';

interface User {
  id: number;
  name: string;
}

interface LendBookModalProps {
  open: boolean;
  onClose: () => void;
  onLend: (userId: number) => void;
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
    <Dialog open={open} onClose={handleClose} className="lend-book-modal">
      <DialogTitle>Select a User to Lend the Book</DialogTitle>
      <DialogContent className="modal-content">
        <FormControl fullWidth>
          <InputLabel id="select-user-label">User</InputLabel>
          <Select
            labelId="select-user-label"
            value={selectedUserId}
            label="User"
            onChange={(e) => setSelectedUserId(e.target.value as number | '')}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions className="modal-actions">
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
