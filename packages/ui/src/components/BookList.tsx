import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: number;
  name: string;
}

interface BookListProps {
  books: Book[];
  loading: boolean;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 250 },
];

const BookList: React.FC<BookListProps> = ({ books, loading }) => {
    const navigate = useNavigate();

    const handleRowClick = (params: GridRowParams) => {
        navigate(`/books/${params.id}`);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={books}
            columns={columns}
            loading={loading}
            onRowClick={handleRowClick}
            disableRowSelectionOnClick
        />
        </div>
    );
};

export default BookList;
