const request = require('request');
const keys = require('../config/keys');

module.exports = function(app){

    app.get('/api', (req, res) => {
        res.send('hi');
    });

    app.get('/api/gifs/:query', (req, res) => {
        let query = req.params.query;
        let api_key = keys.giphyKey;
        let requestURL = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${api_key}&limit=9&rating=g`;
        // The request works on its own in the browser
        console.log(requestURL);

        request({
            method: 'GET',
            uri: requestURL
        },
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                // console.log(response);
                // res.send('success');
                res.send(body);
            } else {
                res.send('fail');
                res.send(error);
            }
        });

    });

    app.get('/api/pexels/:query', (req, res) => {
        let query = req.params.query;
        let api_key = keys.pexelsKey;
        let requestURL = `https://api.pexels.com/v1/search?q=${query}&api_key=${api_key}&per_page=9&page=1`;
        // The request works on its own in the browser
        console.log(requestURL);

        request({
            method: 'GET',
            uri: requestURL
        },
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                // console.log(response);
                // res.send('success');
                res.send(body);
            } else {
                res.send('fail');
                res.send(error);
            }
        });

    });

}