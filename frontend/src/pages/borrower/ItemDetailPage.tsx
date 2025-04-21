import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
const ItemDetailPage: React.FC = () => (
  <Box display="flex" justifyContent="center" mt={2}>
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" height="180" image="https://images.homedepot-static.com/productImages/1e9899be-fb1e-4d8f-b708-0d3ba93926ab/svn/dewalt-walk-behind-lawn-mowers-dcmwsp244u2-64_600.jpg" alt="Lawn mower" />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          DEWALT 20V MAX 21.5‑inch Electric Battery Walk Behind Push Lawn Mower with (2) 10Ah Batteries &amp; Charger
        </Typography>
        <Button variant="contained" fullWidth>
          View
        </Button>
      </CardContent>
    </Card>
  </Box>
);
export default ItemDetailPage;