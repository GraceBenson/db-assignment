const sqlite3 = require('sqlite3').verbose();
 
let db = new sqlite3.Database('./flowers2019.db');

// insert one row into the langs table

/* 
    The run() method executes an INSERT statement with 
    specified parameters and calls a callback afterwards.
*/

db.run(`INSERT INTO sightings(name, person, location, sighted) VALUES(?, ?, ?, ?)`, ['aName', 'aPerson', 'aLocation', 'aDate'], function(err) {
  if (err) {
    return console.log(err.message);
  }

  // get the last insert id

/*  In case the statement is executed successfully, 
    the this object of the callback function will contain two properties:
        lastID: property stores the value of the last inserted row ID.
        changes: property stores the rows affected by the query. */

  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// add flower to flower table
db.run(`INSERT INTO flowers(comname) VALUES(?)`, ['aComname'], function(err) {
    if (err) {
      return console.log(err.message);
    }
  
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });

// close the database connection
db.close();