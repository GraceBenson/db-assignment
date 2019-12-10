const sqlite3 = require('sqlite3').verbose();
 
// open a database connection
let db = new sqlite3.Database('./flowers2019.db');
 
//
let data = ['aGenus', 'aSpecies', 'aComname'];
let sql = `UPDATE flowers
            SET genus = ?, species = ?
            WHERE comname = ?`;
 
/*  The run() method executes an UPDATE statement with 
    specified parameters and calls a callback afterwards. */

db.run(sql, data, function(err) {
  if (err) {
    return console.error(err.message);
  }

  /*    If the UPDATE statement is executed successfully, 
        the this object of the callback function will contain 
        the changes property that stores the number of rows updated. */
    
  console.log(`Row(s) updated: ${this.changes}`);
 
});
 
// close the database connection
db.close();