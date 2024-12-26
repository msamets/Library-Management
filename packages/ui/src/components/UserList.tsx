import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
}

interface UserListProps {
  users: User[];
  loading: boolean;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
];

const UserList: React.FC<UserListProps> = ({ users, loading }) => {
    const navigate = useNavigate();

    const handleRowClick = (params: GridRowParams) => {
        navigate(`/users/${params.id}`);
    };

    return (
        <div style={{ height: 500, width: '100%' }}>
        <DataGrid
            rows={users}
            columns={columns}
            loading={loading}
            onRowClick={handleRowClick}
            disableRowSelectionOnClick
        />
        </div>
    );
};

export default UserList;
