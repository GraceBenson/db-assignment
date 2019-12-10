const express = require('express');
const cors = require ('cors');
const sqlite3 = require('sqlite3').verbose();
//const router = express.Router();

const testquery = `SELECT comname as name
FROM flowers`

let db = new sqlite3.Database('./flowers2019.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    else
    console.log('Connected to the flower2019 database.');
  });


const app = express();
app.use(cors());

app.get('/', (req, res) =>{
    res.send("hello ")
});

//Allow user to select a flower from the list of flowers
//then display top 10 recent sightings for the selected flower
app.get('/flowers', (req, res)=> {
  db.all(`SELECT comname as name FROM flowers`, [], (err, row) => {
    if (err) {
      return res.send(err);
    }
    else {
      return res.json(row)
    }
  })
})

// Create index for sightings
// app.get('/flowers', (req, res)=> {
//   db.all(`CREATE INDEX sighings_id ON sightings (name, person, location, sighted)`, (err, row) => {
//     if (err) {
//       return res.send(err);
//     }
//     else {
//       return res.send('Successfully created index on sightings')
//     }
//   })
// })

// Add a new flower to flowers
//get top ten sightings for a flower
app.get('/sightings', (req, res) =>
{
  const {comname} = req.query;
  db.all('SELECT * FROM sightings WHERE name = ? LIMIT 10', [comname], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    else{
    //console.log(rows)
      return res.json(rows);
    }
  });
})

app.get('/getSightings', (req, res) =>
{
  const {comname} = req.query;
  db.all('SELECT * FROM sightings', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    else{
    //console.log(rows)
      return res.json(rows);
    }
  });
})

app.get('/flowers/add', (req, res) => {
  const {name} = req.query;
  const INSERT_FLOWERS = `INSERT INTO flowers(comname) VALUES('${name}')`;
  db.run(INSERT_FLOWERS, function(err, results) {
    if (err) {
      return res.send(err)
    }
    else {
      return res.send('successfully added flower')
    }
  })
})

// Add new sighting to sightings
app.get('/flowers/addSighting', (req, res) => {
  const {name, person, location, sighted} = req.query;
  const INSERT_SIGHTINGS = `INSERT INTO sightings(name, person, location, sighted) VALUES(
    '${name}', '${person}', '${location}', '${sighted}')`;
  db.run(INSERT_SIGHTINGS, function(err, results) {
    if (err) {
      return res.send(err)
    }
    else {
      return res.send('successfully added sighting')
    }
  })
})

// Update sightings info
app.get('/flowers/update', (req, res) => {
  const {name, person, location, sighted} = req.query;
  const UPDATE_FLOWERS = `UPDATE sightings SET person = '${person}', location = '${location}',
    sighted = '${sighted}' WHERE name = '${name}'`;
  db.run(UPDATE_FLOWERS, function(err, results) {
    if (err) {
      return res.send(err)
    }
    else {
      return res.send('successfully updated sightings')
    }
  })
})

// Delete sightings info
app.get('/flowers/delete', (req, res) => {
  const {name, person, location, sighted} = req.query;
  const UPDATE_FLOWERS = `DELETE FROM sightings WHERE name = '${name}' AND person = '${person}' AND location = '${location}'
    AND sighted = '${sighted}'`;
  db.run(UPDATE_FLOWERS, function(err, results) {
    if (err) {
      return res.send(err)
    }
    else {
      return res.send('successfully updated sightings')
    }
  })
})

app.listen(4000, ()=>{
    console.log("server listening");
})

// module.exports = router;
