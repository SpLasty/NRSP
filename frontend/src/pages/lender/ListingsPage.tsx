import {
  Box, Grid, Card, CardMedia, CardContent, Typography,
  CardActions, Button, Skeleton, Alert,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchMyItems, Item } from '../../services/itemService';
import { Link } from 'react-router-dom';

export default function ListingsPage() {
  const { data, isLoading, error } = useQuery<Item[]>({
    queryKey: ['my-items'],
    queryFn: fetchMyItems,
  });

  if (isLoading) return <Skeleton variant="rectangular" height={200} />;

  if (error) return <Alert severity="error">{(error as Error).message}</Alert>;

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>My Listings</Typography>

      {data?.length === 0 && (
        <Alert severity="info">You haven’t listed any items yet.</Alert>
      )}

      <Grid container spacing={2}>
        {data?.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              {item.imageUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={item.imageUrl.startsWith('http')
                  ? item.imageUrl 
                  : `${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                  alt={item.title}
                />
              )}

              <CardContent>
                <Typography variant="h6" noWrap>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.category ?? '—'} • {item.condition}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" component={Link} to={`/items/${item.id}`}>
                  View
                </Button>
                <Button size="small" component={Link} to={`/lender/edit/${item.id}`}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
