import React from 'react';
import TextField from '@mui/material/TextField';
import '../css/ScoreTotal.css';
import '../css/main.css';

function ScoreTotal(props) {
  return (
    <div>
      <div>
        <TextField
          id="outlined-basic"
          label="Comment"
          variant="outlined"
          multiline
          color="primary"
          rows={4}
          fullWidth />
      </div>
      <div className="container">
        <div className='totalScore' style={{ background: `linear-gradient(180deg, rgba(255,255,255,1) ${100 - props.totalScore}%, rgba(255,206,71,1) 0%)` }}>
          <b>{props.totalScore}</b>
        </div>
      </div>
    </div>
  );
}

export default ScoreTotal;
