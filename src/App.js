import React, {useState, useEffect} from 'react';
import CriteriaSlider from './components/CriteriaSlider';
import Grid from '@mui/material/Grid';
import {theme} from './themes'
import {ThemeProvider} from '@mui/material/styles';
import ScoreFooter from './components/ScoreFooter';
import ScoreTotal from './components/ScoreTotal';
import {criteriaOptions} from './criteriaOptions';
import {saveRating} from './data'
import Register from './components/Register';
import './css/App.css';
import SubmitButton from './components/SubmitButton';
import BeerPour from './components/BeerPour';

function App() {
    const [scoreArray, setScoreArray] = useState([]);
    let [totalScore, setTotalScore] = useState();
    let [status, setStatus] = useState();
    let [username, setUsername] = useState();
    let [beername, setBeername] = useState();
    let [beerData, setBeerData] = useState();
    let [beerIndex, setBeerIndex] = useState(0);
    let [ratingData, setRatingData] = useState();
    let [ratingsForUser, setRatingsForUser] = useState();
    // useEffect(() => {
    //     const ratingsForUser = ratingData ? ratingData.filter(function (rating) {
    //         return rating.username == username;
    //     }) : null;
    //     if (ratingsForUser) {
    //         setBeerIndex(ratingsForUser.length - 1);
    //     }
    //     if (beerData) {
    //         setBeername(beerData[beerIndex]);
    //     }
    // });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!scoreArray || scoreArray.length !== 5) {
            alert("Please select a rating for each criteria");
            return;
        }
        // get next beer info
        saveRating(username, beername, scoreArray, totalScore);
        if (beerIndex === beerData.length - 1) {
            setStatus("END");
            return;
        }
        setBeerIndex(beerIndex + 1);
        setScoreArray([]);
    }

    function calcTotal(scoreArray) {
        let total = 0;
        scoreArray.forEach((criteria) => {
                total = total += criteria.score;
            }
        )
        return total;
    }

    function setFirstBeer(data) {
        setBeername(data[0].name)
    }

    function updateRegistration(status) {
        setStatus(status);
    }

    function updateUsername(name) {
        setUsername(name);
    }

    function updateBeerData(data) {
        setBeerData(data);
        setFirstBeer(data);
    }

    function updateRatingData(data) {
        setRatingData(data);
    }

    const handleSliderChange = (event, newValue, title) => {
        if (!scoreArray.find(criteria => criteria.title === title)) {
            scoreArray.push({
                title,
                score: newValue
            });
        } else {
            const arrayIndex = scoreArray.findIndex(criteria => criteria.title === title);
            scoreArray[arrayIndex].score = newValue;
        }
        setTotalScore(calcTotal(scoreArray));
    };
    return (
        <div>
            <div className="header"></div>
            <ThemeProvider theme={theme}>
                {!status &&
                    <React.Fragment>
                        <BeerPour/>
                        <Register
                            updateRegistration={updateRegistration}
                            username={username}
                            updateUsername={updateUsername}
                            updateBeerData={updateBeerData}
                            updateRatingData={updateRatingData}
                        />
                    </React.Fragment>
                }
                {status === "REVIEWING" &&
                    <form onSubmit={handleSubmit}>
                        <React.Fragment>
                            <div
                                className="roundTitle">Round {beerIndex + 1} - {beerData && beerData[beerIndex] ? beerData[beerIndex].code : ''}</div>
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
                                        totalScore={totalScore}/>
                                    <SubmitButton/>
                                </div>
                            </Grid>
                        </React.Fragment>
                    </form>
                }
                {status === "END" &&
                    <div className="register">
                        <div>
                            Finished!
                        </div>
                    </div>
                }
                <ScoreFooter/>
            </ThemeProvider>
        </div>
    );
}

export default App;
