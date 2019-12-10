/*  When you know that the result set 
    contains zero or one row e.g., querying 
    a row based on the primary key or querying 
    with only one aggregate function such as 
    count, sum, max, min, etc., you can use the
    get() method of Database object.

    The get() method executes an SQL query and 
    calls the callback function on the first 
    result row. In case the result set is empty, 
    the row argument is undefined.

    For example, querying flower species by common name.
*/

const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./flowers2019.db');
 
let sql = `SELECT comname cname,
                  species species
           FROM flowers
           WHERE comname  = ?`;
let comName = "Death camas";
 
// first row only
db.get(sql, [comName], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  return row
    ? console.log(row.cname, row.species)
    : console.log(`No species found with the common name ${comName}`);
 
});
 
// close the database connection
db.close();