const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getById);
router.post('/concerts', ConcertController.addNew);
router.put('/concerts/:id', ConcertController.change);
router.delete('/concerts/:id', ConcertController.deleteById);

//new endpoints:
//get concerts by the artist/performer:
router.get('/concerts/performer/:performer', ConcertController.getByPerformer);
//get concerts by kind of music/genre:
router.get('/concerts/genre/:genre', ConcertController.getByGenre);
//get concerts by price, from min.price to max.price:
router.get('/concerts/price/:price_min/:price_max', ConcertController.getByPrice);
//get concerts by a current day:
router.get('/concerts/day/:day', ConcertController.getByDay);

module.exports = router;
