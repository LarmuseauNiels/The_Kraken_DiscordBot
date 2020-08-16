
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
        });
    })

    app.get('/channelActivity', function (req, res) {
        var responce;
        client.DBconnection.query(
           "select Channel.ChannelName, count(*) from VoiceConnected left join Channel on VoiceConnected.ChannelID = Channel.ID "+
           " WHERE VoiceConnected.TimeStamp >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY group by Channel.ChannelName",
            function (error, results, fields) {
                if(error != null){ 
                    console.log(error)
                    res.send(JSON.stringify("Failure"))
                }
                else{
                    res.send(JSON.stringify(results))
            }
        });
    })
    app.get('/userActivity', function (req, res) {
        var responce;
        client.DBconnection.query(
           "SELECT Members.DisplayName,VoiceConnected.ID , count(*) FROM VoiceConnected LEFT JOIN Members ON VoiceConnected.ID = Members.ID "+
           " WHERE VoiceConnected.TimeStamp >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY GROUP BY VoiceConnected.ID" ,
            function (error, results, fields) {
                if(error != null){ 
                    console.log(error)
                    res.send(JSON.stringify("Failure"))
                }
                else{
                    res.send(JSON.stringify(results))
            }
        });
    })
    
    app.listen(3000)
}
