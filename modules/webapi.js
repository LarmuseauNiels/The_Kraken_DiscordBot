
//const config = require("../data/webapi.json");
const express = require('express');
var cors = require('cors');
const app = express();




module.exports = function (client) {
    app.use(cors());

    console.log("Loading WabApi Module")
    app.get('/', function (req, res) {
        res.send('API test page.')
    })
    
    app.get('/activity', function (req, res) {
        var responce;
        client.DBconnection.query(
            'select timestamp,count(*) as online from VoiceConnected group by timestamp',
             function (error, results, fields) {
                if(error != null){ 
                    console.log(error)
                    res.send(JSON.stringify("Failure"))
                }
                else{
                    res.send(JSON.stringify(results))
                }
                //results.forEach(result => knownUserCache.push(result.ID))
            });
       

        //
    })
    


    app.listen(3000)
}
