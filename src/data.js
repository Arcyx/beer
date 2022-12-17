function buildPostBody(collection, username) {
    return {
            "username": username,
        };
}

function buildRatingPostBody(collection, username, beername, scoreArray, totalScore) {
    let ratingsObjectArray = [];
    scoreArray.forEach(score => {
        ratingsObjectArray.push(
            {
                criteria: score.title,
                score: score.score
            },
        )
    })
    return {
            "beername" : beername,
            "username" : username,
            "ratings": ratingsObjectArray,
            "totalScore" : totalScore,
        };
}

export const registerUser = async (username) => {
    let response = await fetch('http://localhost:8080/register', {
        method: 'post',
        body: JSON.stringify(buildPostBody("user", username)),
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
        }
    });
    return await response;
};

export const saveRating = async (username, beername, scoreArray, totalScore) => {
    let response = await fetch('http://localhost:8080/ratings', {
        method: 'post',
        body: JSON.stringify(buildRatingPostBody("rating", username, beername, scoreArray, totalScore)),
        crossorigin: true,
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Content-Type': 'application/json',
        }
    });
    return await response;
};

export const getRatings = async () => {
    let response = await fetch('http://localhost:8080/ratings', {
        method: 'get',
        crossorigin: true,
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
};

export const getBeers = async () => {
    let response = await fetch('http://localhost:8080/beers', {
        method: 'get',
        crossorigin: true,
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
};
