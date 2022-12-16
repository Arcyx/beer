import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import '../css/Register.css';
import '../css/main.css';
import SubmitButton from './SubmitButton';
import { registerUser, getBeers } from '../data';
function Register(props) {
  const register = async () => {
    setUser(await registerUser(props.username));
    setBeers(await getBeers());
  };

  function setUser(response) {
    if (response.status <= 204) {
      props.updateRegistration();
    }
  }

  function setBeers(response) {
    console.log(response);
    if (response.status <= 204) {
      props.updateBeerData(response);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div>
          Welcome
        </div>
        <div className="container">
          <Stack direction="column" spacing={2}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              onChange={(e) => {
                props.updateUsername(e.target.value);
              }}
              color="primary"
            />
          </Stack>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

export default Register;
