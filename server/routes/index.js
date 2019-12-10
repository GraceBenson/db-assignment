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
// TODO: see if it works
app.get('/flowers', (req, res)=> {
  db.all(`CREATE INDEX sighings_id ON sightings`, (err, row) => {
    if (err) {
      return res.send(err);
    }
    else {
      return res.send('Successfully created index on sightings')
    }
  })
})

app.get('/flowers/add', (req, res) => {
  const {name, person, location, sighted} = req.query;
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

app.get('/flowers/add', (req, res) => {
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

app.get('/flowers/update', (req, res) => {
  const {name, person, location, sighted} = req.query;
  const UPDATE_FLOWERS = `UPDATE sightings SET person = '${person}', location = '${location}',
    sighted = '${sighted}' WHERE name = '${name}'`;
  db.run(UPDATE_FLOWERS, function(err, results) {
    if (err) {
      return res.send(err)
    }
    else {
      return res.send('successfully updated flower')
    }
  })
})

app.get('/flowers/index', (req, res) => {
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
app.listen(4000, ()=>{
    console.log("server listening");
})

// module.exports = router;
