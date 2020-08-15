const mysql = require('mysql');
const config = require("../data/webapi.json");
const express = require('express')
const app = express()

var connection = mysql.createConnection({
  host     : process.env.DBHOST,
  user     : 'root',
  password : process.env.DBPASS,
  database : 'discordstats'
});


module.exports = function () {
    app.get('/', function (req, res) {
        res.send('API test page.')
    })
    app.get('/ping', function (req, res) {
        res.send('pong')
    })

    app.listen(3000)
}
