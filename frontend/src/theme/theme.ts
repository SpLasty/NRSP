import { createTheme } from '@mui/material/styles';

export const drawerWidth = 240;

export const theme = createTheme({
  palette: {
    primary: { main: '#00695c' },     // logout button / icons
    background: { default: '#fafafa' },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: drawerWidth,
          backgroundColor: '#004d40',
          color: '#ffffff',
          borderRight: 'none',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#00695c',
          },
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.08)',
          },
        },
      },
    },
  },
});
