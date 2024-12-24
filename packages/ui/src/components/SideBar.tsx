import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const isUsersActive = path.startsWith('/users');
  const isBooksActive = path.startsWith('/books');

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 64,
          p: 2,
        }}
      >
        <Typography variant="h6" component="div">
          Library Management System
        </Typography>
      </Box>
      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/users"
            selected={isUsersActive}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/books"
            selected={isBooksActive}
          >
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Books" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
