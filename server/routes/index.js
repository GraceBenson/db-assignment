const express = require('express');
const cors = require ('cors');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

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

var data = [];
//Allow user to select a flower from the list of flowers
//then display top 10 recent sightings for the selected flower
app.get('/flowers', (req, res)=> {
  db.each(`SELECT comname as name FROM flowers`, (err, row) => {
    if (err) {
    console.error(err.message);
    res.status(404).json({ errors });
    return;
    }
  //   else {
  //     console.log(row.name)
  //     return res.json({ data: row })
  //   }
  // })
    data.push(row.name);
    }).then(res.send(data))
})

// app.get('/sightings/add', (req, res) => {
//   const {name, person, location, sighted} = req.query;
//   const INSERT_SIGHTINGS = `INSERT INTO sightings(name, person, location, sighted) VALUES(
//     '${name}', '${person}', '${location}', '${sighted}')`;
//   db.run(INSERT_SIGHTINGS, function(err, results) {
//     if (err) {
//       return res.send(err)
//     }
//     else {
//       return res.send('successfully added sighting')
//     }
//   })
// })

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
  const {genus, species, comname} = req.query;
  const UPDATE_FLOWERS = `UPDATE flowers SET genus = '${genus}', species = '${species}' WHERE comname = '${comname}`;
  db.run(UPDATE_FLOWERS, function(err, results) {
    if (err) {
      return res.send(err)
    }
    else {
      return res.send('successfully updated flower')
    }
  })
})

app.listen(4000, ()=>{
    console.log("server listening");
})

module.exports = router;
