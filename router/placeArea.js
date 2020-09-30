const router = require('express').Router();


const placesControllers = require('../controllers/placeArea');

router.get('/jerusalem', placesControllers.getJerusalemPlaces);

router.get('/center', placesControllers.getCenterPlaces);

module.exports = router;
