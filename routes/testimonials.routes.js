const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const db = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(item => item.id === parseInt(req.params.id)));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  db.testimonials.push({
    id: uuidv4(),
    author,
    text,
  });
  return res.json({massage: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const editedItem = db.testimonials.find(testimonial => testimonial.id === parseInt(req.params.id));
  const indexOfEditedItem = db.testimonials.indexOf(editedItem);
  db.testimonials[indexOfEditedItem] = {
    ...editedItem,
    author: author,
    text: text,
  }
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const el = db.testimonials.filter(item => item.id === parseInt(req.params.id));
  const index = db.testimonials.indexOf(el);
  db.testimonials.splice(index, 1);
  res.json({massage: 'OK'});
});

module.exports = router;