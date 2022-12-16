import React, { useState } from 'react';
import CriteriaSlider from './components/CriteriaSlider';
import Grid from '@mui/material/Grid';
import { theme } from './themes'
import { ThemeProvider } from '@mui/material/styles';
import ScoreFooter from './components/ScoreFooter';
import ScoreTotal from './components/ScoreTotal';
import { criteriaOptions } from './criteriaOptions';
import { saveRating } from './data'
import Register from './components/Register';
import './css/App.css';
import SubmitButton from './components/SubmitButton';

function App() {
  const [scoreArray] = useState([]);
  let [totalScore, setTotalScore] = useState();
  let [isRegistered, setIsRegistered] = useState();
  let [username, setUsername] = useState();
  let [beername, setBeername] = useState();
  let [beerData, setBeerData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (scoreArray.length !== 5) {
      alert("Please select a rating for each criteria");
      return;
    }
    saveRating(username, beername, scoreArray, totalScore);
  }

  function calcTotal(scoreArray) {
    let total = 0;
    scoreArray.forEach((criteria) => {
      total = total += criteria.score;
    }
    )
    return total;
  }

  function updateRegistration() {
    setIsRegistered(true);
  }

  function updateUsername(name) {
    setUsername(name);
  }

  function updateBeerData(data) {
    console.log(data);
    setBeerData(data);
  }

  const handleSliderChange = (event, newValue, title) => {
    if (!scoreArray.find(criteria => criteria.title === title)) {
      scoreArray.push({
        title,
        score: newValue
      });
    }
    else {
      const arrayIndex = scoreArray.findIndex(criteria => criteria.title === title);
      scoreArray[arrayIndex].score = newValue;
    }
    setTotalScore(calcTotal(scoreArray));
  };
  return (
    <div>
      <div className="header"></div>
      <ThemeProvider theme={theme}>
        {!isRegistered &&
          <Register
            updateRegistration={updateRegistration}
            username={username}
            updateUsername={updateUsername}
            updateBeerData={updateBeerData}
          />}
        {isRegistered &&
          <form onSubmit={handleSubmit}>
            <React.Fragment>
              <div className="roundTitle">Round 1</div>
              <Grid container justifyContent="center">
                <div className="App">
                  {criteriaOptions.map((criteria) => {
                    return (
                      <CriteriaSlider
                        title={criteria.title}
                        description={criteria.description}
                        pointDescription={criteria.pointDescription}
                        max={criteria.max}
                        handleSliderChange={(e, value) => handleSliderChange(e, value, criteria.title)}
                        scoreArray={scoreArray}
                      />
                    );
                  })}
                  <ScoreTotal
                    totalScore={totalScore} />
                  <SubmitButton />
                </div>
              </Grid >
            </React.Fragment>
          </form>
        }
        <ScoreFooter />
      </ThemeProvider>
    </div >
  );
}

export default App;
