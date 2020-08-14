var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DBHOST,
  user     : 'root',
  password : process.env.DBPASS,
  database : 'discordstats'
});

connection.query('SELECT 1', function (error, results, fields) {
    if (error) throw error;
    // connected!
  });

  connection.query(
    'INSERT INTO table_name (column1, column2, column3) VALUES (?, ?, ?)',
    ['David'], function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)


  });