import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import { Home, List as ListIcon, Notifications, Person } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'List Items', icon: <ListIcon />, path: '/list-items' },
  { text: 'Notifications', icon: <Notifications />, path: '/notifications' },
  { text: 'Profile', icon: <Person />, path: '/profile' }
];

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: '#004f4f' }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="secondary">Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#f4f4f4'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Neighbour Resource Sharing</Typography>
          <Typography variant="subtitle2">Account Type: Lender</Typography>
        </Box>
        <List>
          {navItems.map(({ text, icon, path }) => (
            <NavLink key={path} to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#fff', p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
