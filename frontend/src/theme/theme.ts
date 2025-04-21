import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#005f5b' }, // deep teal (matches mock‑up buttons)
    secondary: { main: '#8BC34A' },
    background: { default: '#f5f5f5' },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(#9e9e9e,#e0e0e0)',
          color: '#000',
          width: 220,
        },
      },
    },
  },
});