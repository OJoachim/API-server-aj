const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const db = require('./db');

const app = express();
const msg = { message: 'OK' };

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials.filter(item => item.id === parseInt(req.params.id)));
});

app.get('/testimonials/random', (req, res) => {
  const rand = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(rand);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  db.testimonials.push({
    id: uuidv4(),
    author,
    text,
  });
  return res.json({massage: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  for (let i = 0; i < db.testimonials.length; i++) {
    if (db.testimonials[i].id === (parseInt(req.params.id))) {
      db.testimonials[id].author = author;
      db.testimonials[id].text = text;
      res.json(msg);
    } else {
      res.json({ message: `this post with ${req.params.id} doesn't exists` })
    }
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const el = db.testimonials.filter(item => item.id === parseInt(req.params.id));
  const index = db.testimonials.indexOf(el);
  db.testimonials.splice(index, 1);
  res.json(msg);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});