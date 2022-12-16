import React from 'react';
import Button from '@mui/material/Button';
import '../css/main.css';

function SubmitButton(props) {
  return (
    <div className="container">
    <Button
      variant="outlined"
      size="large"
      type="submit"
      color="secondary">
      Submit
    </Button>
  </div>
  );
}

export default SubmitButton;
