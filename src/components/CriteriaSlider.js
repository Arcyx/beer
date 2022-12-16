import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import '../css/CriteriaSlider.css';


function CriteriaSlider(props) {
  const marksArray = [
    {
      value: props.max,
      label: props.max,
    }
  ]
  return (
    <div className="criteria">
      <div className="display: 'flex'"><b>{props.title}:</b> {props.description} <i>{props.pointDescription} </i></div>
      <div className="display: 'flex'">
        <Box width={300}>
          <Slider
            defaultValue={0}
            aria-label="Small"
            valueLabelDisplay="auto"
            min={0}
            key={props.title}
            marks={marksArray}
            max={props.max}
            onChange={props.handleSliderChange}
          />
        </Box>
      </div>
    </div>
  );
}

export default CriteriaSlider;
