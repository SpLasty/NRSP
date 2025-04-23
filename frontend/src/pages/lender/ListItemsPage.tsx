import { Box, Typography, Alert } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { ItemForm } from '../../components/ItemForm';
import { createItem, Item, ItemPayload } from '../../services/itemService';

export default function ListItemsPage() {
  const {
    mutate: create,
    isPending,
    isSuccess,
    error,
  } = useMutation<Item, Error, ItemPayload>({
    mutationFn: createItem,
  });

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>
        List a New Item
      </Typography>

      {isSuccess && <Alert severity="success">Item listed successfully!</Alert>}
      {error && <Alert severity="error">{error.message}</Alert>}

      <ItemForm
        onSubmit={(data) => create(data)}
        submitLabel={isPending ? 'Saving…' : 'List Item'}
      />
    </Box>
  );
}
