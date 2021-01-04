const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

//const db = require('./../db');
const db = require('../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter(item => item.id === parseInt(req.params.id)));
});

router.route('/concerts').post((req, res) => {
  const { day, image, price, performer, genre } = req.body;
  db.concerts.push({
    id: uuidv4(),
    day: day,
    image: image,
    price: price,
    genre: genre,
    performer: performer,
  });
  return res.json({massage: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
  const { day, image, price, performer, genre } = req.body;
  const editedItem = db.concerts.find(concert => concert.id === parseInt(req.params.id));
  const indexOfEditedItem = db.concerts.indexOf(editedItem);
  db.concerts[indexOfEditedItem] = {
    ...editedItem,
    day: day,
    image: image,
    price: price,
    genre: genre,
    performer: performer,
  }
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const el = db.concerts.filter(item => item.id === parseInt(req.params.id));
  const index = db.concerts.indexOf(el);
  db.concerts.splice(index, 1);
  res.json({massage: 'OK'});
});

module.exports = router;