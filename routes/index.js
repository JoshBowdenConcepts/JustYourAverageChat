module.exports = function(app){

    app.get('/', (req, res) => {
        res.status(200);
        res.sendFile(__dirname + '/index.html');
    });

}