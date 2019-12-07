/*  The each() method executes an SQL query 
    with specified parameters and calls a 
    callback for every row in the result set.
*/

const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./flowers2019.db');
 
let sql = `SELECT Name fname,
            Person pname
            FROM sightings
            WHERE Location = ?
            ORDER BY fname`;
 
db.each(sql, ['Double Mountain'], (err, row) => {
  if (err) {
    throw err;
  }
  console.log(`${row.fname} ${row.pname}`);
});
 
// close the database connection
db.close();