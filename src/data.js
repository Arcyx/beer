function buildPostBody(collection, username) {
    return {
        "collection": collection,
        "database": "beerParty",
        "dataSource": "Cluster0",
        "document": {
            "username": username,
        }
    };
}

function buildBeerPostBody() {
    return {
        "collection": "beer",
        "database": "beerParty",
        "dataSource": "Cluster0",
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
        "collection": collection,
        "database": "beerParty",
        "dataSource": "Cluster0",
        "document": {
            "beername" : beername,
            "username" : username,
            "ratins": ratingsObjectArray,
            "totalScore" : totalScore,
        }
    };
}

export const registerUser = async (username) => {
    let response = await fetch('http://localhost:8010/proxy/app/data-sxiyl/endpoint/data/v1/action/insertOne', {
        method: 'post',
        body: JSON.stringify(buildPostBody("user", username)),
        crossorigin: true,
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Content-Type': 'application/json',
            'api-key': 'v5MZxuNphdxpBTKKQnb45LSihGorIbMj0HAD0XBKEPzfKeb2aPO1tefKn5Sks4bo'
        }
    });
    return await response;
};

export const saveRating = async (username, beername, scoreArray, totalScore) => {
    let response = await fetch('http://localhost:8010/proxy/app/data-sxiyl/endpoint/data/v1/action/insertOne', {
        method: 'post',
        body: JSON.stringify(buildRatingPostBody("rating", username, beername, scoreArray, totalScore)),
        crossorigin: true,
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Content-Type': 'application/json',
            'api-key': 'v5MZxuNphdxpBTKKQnb45LSihGorIbMj0HAD0XBKEPzfKeb2aPO1tefKn5Sks4bo'
        }
    });
    return await response;
};

export const getBeers = async () => {
    let response = await fetch('http://localhost:8010/proxy/app/data-sxiyl/endpoint/data/v1/action/find', {
        method: 'post',
        body: JSON.stringify(buildBeerPostBody()),
        crossorigin: true,
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Content-Type': 'application/json',
            'api-key': 'v5MZxuNphdxpBTKKQnb45LSihGorIbMj0HAD0XBKEPzfKeb2aPO1tefKn5Sks4bo'
        }
    });
    return await response.json();;
};
