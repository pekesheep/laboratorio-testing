import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent spec', () => {
  it('should render the confirmation dialog with the correct props and children', () => {
    const title = 'Are you sure?';
    const labels = {
      closeButton: 'Cancel',
      acceptButton: 'Yes',
    };
    const children = 'This action cannot be undone.';

    const { getByText } = render(
      <ConfirmationDialogComponent
        isOpen
        onAccept={() => {}}
        onClose={() => {}}
        title={title}
        labels={labels}
      >
        {children}
      </ConfirmationDialogComponent>
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(labels.closeButton)).toBeInTheDocument();
    expect(getByText(labels.acceptButton)).toBeInTheDocument();
    expect(getByText(children)).toBeInTheDocument();
  });

  it('should call the onAccept and onClose callbacks when the buttons are clicked', () => {
    const onAccept = jest.fn();
    const onClose = jest.fn();

    const { getByText } = render(
      <ConfirmationDialogComponent
        isOpen
        onAccept={onAccept}
        onClose={onClose}
        title="Are you sure?"
        labels={{
          closeButton: 'Cancel',
          acceptButton: 'Yes',
        }}
      >
        This action cannot be undone.
      </ConfirmationDialogComponent>
    );

    const acceptButton = getByText('Yes');
    const closeButton = getByText('Cancel');

    fireEvent.click(acceptButton);
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
