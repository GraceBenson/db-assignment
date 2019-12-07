const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./flowers2019.db');
 
let sql = `SELECT DISTINCT comname as name FROM flowers
           ORDER BY name`;
 
/*  The all() method allows you to execute an SQL query
    with specified parameters and call a callback to 
    access the rows in the result set. */

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  
  /*    Because the all() method retrieves all rows and
        places them in the memory, therefore, for the 
        large result set, you should use the each() method. */

  rows.forEach((row) => {
    console.log(row.name);
  });
});
 
// close the database connection
db.close();