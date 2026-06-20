import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';

export const openConfirmModal = ({ 
  title = 'Are you sure?', 
  message = 'This action cannot be undone.', 
  confirmLabel = 'Confirm',
  onConfirm 
}) => modals.openConfirmModal({
  title: title,
  centered: true,
  children: (
    <Text size="sm">{message}</Text>
  ),
  labels: { confirm: confirmLabel, cancel: 'Cancel' },
  confirmProps: { color: 'red' },
  onConfirm: () => onConfirm(),
});