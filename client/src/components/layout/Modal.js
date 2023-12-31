import React, { useState } from 'react';
import { Button, Modal } from '@mui/material';

const ModalComponent = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFillAgain = () => {
    // Handle "Fill Again" button click here
    console.log("Fill Again clicked");
    // You can perform any actions you want here
  };

  const handleNext = () => {
    // Handle "Next" button click here
    console.log("Next clicked");
    // You can perform any actions you want here
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="modal-content">
          <h2>Modal Content</h2>
          <p>This is the content of the modal.</p>
          <Button variant="contained" onClick={handleFillAgain}>
            Fill Again
          </Button>
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComponent;
