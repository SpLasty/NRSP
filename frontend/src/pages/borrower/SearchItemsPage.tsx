import React, { useState } from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '400px' };
const defaultCenter = { lat: 51.0447, lng: -114.0719 };

const SearchItemsPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const itemNames: string[] = [];
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY!,
  });

  if (loadError) {
    return <Box>Map failed to load</Box>;
  }

  return (
    <Box>
      <Autocomplete
        freeSolo
        options={itemNames}
        onInputChange={(_, value) => setQuery(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Search items"
            variant="outlined"
            fullWidth
            sx={{
              my: 2,
              backgroundColor: '#e0e0e0',
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            }}
          />
        )}
      />

      <Box sx={containerStyle}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={12}
          >
            {/* Example marker at center */}
            <Marker position={defaultCenter} />
          </GoogleMap>
        ) : null}
      </Box>
    </Box>
  );
};

export default SearchItemsPage;