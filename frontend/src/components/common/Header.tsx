import {
  AppBar, Toolbar, Button, Typography, Box,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { drawerWidth } from '../../theme/theme';

export const Header: React.FC = () => {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const queryCache = useQueryClient();
  const { user }   = useSelector(selectAuth);

  const displayName =
    user?.name ??
    user?.email?.split('@')[0] ??
    'User';

  const handleLogout = () => {
    dispatch(logout());
    queryCache.clear();
    navigate('/login');
  };

  return (
  <AppBar
    position="fixed"
    color="inherit"
    elevation={1}
    sx={{
      zIndex: theme => theme.zIndex.drawer + 1,
      width: `calc(100% - ${drawerWidth}px)`,
      ml: `${drawerWidth}px`,
    }}
  >
    <Toolbar sx={{ justifyContent: 'flex-end', gap: 2 }}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, textDecoration: 'underline' }}
      >
        {displayName}
      </Typography>

      <Button
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ bgcolor: 'primary.main' }}
      >
        Logout
      </Button>
    </Toolbar>
  </AppBar>

  );
};
