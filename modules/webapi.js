const mysql = require('mysql');
//const config = require("../data/webapi.json");
const express = require('express')
const app = express()

var connection = mysql.createConnection({
  host     : process.env.DBHOST,
  user     : 'root',
  password : process.env.DBPASS,
  database : 'discordstats'
});


module.exports = function () {
    console.log("Loading WabApi Module")
    app.get('/', function (req, res) {
        res.send('API test page.')
    })
    
    app.get('/activity', function (req, res) {
        var responce;
        connection.query(
            'select timestamp,count(*) from VoiceConnected group by timestamp',
             function (error, results, fields) {
                if(error != null){ responce = error}
                else{
                    responce =  results
                }
                //results.forEach(result => knownUserCache.push(result.ID))
            });
        res.send(JSON.stringify(responce))

        //
    })
    


    app.listen(3000)
}
