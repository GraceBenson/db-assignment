const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('./flowers2019.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    else
    console.log('Connected to the flower2019 database.');
  });

  db.serialize(() => {
    db.each(`SELECT comname as name
             FROM flowers`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log( row.name);
    });
  });
   
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });