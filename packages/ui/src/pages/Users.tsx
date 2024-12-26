import React, { useEffect } from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import UserList from '../components/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers, selectUsersLoading, selectUsersError } from '../redux/slices/usersSlice.ts';
import { RootState, AppDispatch } from '../store';

const Users: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : (
        <UserList users={users} loading={loading} />
      )}
    </Container>
  );
};

export default Users;
