const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

//const db = require('./../db');
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter(item => item.id === parseInt(req.params.id)));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  db.seats.push({
    id: uuidv4(),
    day: day,
    seat: seat,
    client: client,
    email: email,
  });
  return res.json({massage: 'OK'});
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const editedItem = db.seats.find(seat => seat.id === parseInt(req.params.id));
  const indexOfEditedItem = db.seats.indexOf(editedItem);
  db.seats[indexOfEditedItem] = {
    ...editedItem,
    day: day,
    seat: seat,
    client: client,
    email: email,
  }
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const el = db.seats.filter(item => item.id === parseInt(req.params.id));
  const index = db.seats.indexOf(el);
  db.seats.splice(index, 1);
  res.json({massage: 'OK'});
});

module.exports = router;