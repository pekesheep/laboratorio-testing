import { act, renderHook } from '@testing-library/react';
import { createEmptyLookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('ConfirmationDialogComponent spec', () => {
  it('useConfirmationDialog', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    // Initial state
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());

    // Open the confirmation dialog
    act(() => result.current.onOpenDialog({ id: '1', name: 'Item 1' }));
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual({ id: '1', name: 'Item 1' });

    // Close the confirmation dialog
    act(() => result.current.onClose());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual({ id: '1', name: 'Item 1' });

    // Accept the confirmation dialog
    act(() => result.current.onAccept());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
