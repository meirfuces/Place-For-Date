const router = require('express').Router();
const placesControllers = require('../controllers/places');
//const authControllers = require('../controllers/authentication');
router.get('/add-place', placesControllers.getAddPlace);
      
router.post('/add-places', placesControllers.postAddPlace);

router.get('/all-places', placesControllers.getAllPlaces);

router.post('/delete-place', placesControllers.postDeletePlace);
router.get('/place/:placeId', placesControllers.getDetailsPlace);
//router.get('/login', authControllers.getLogin);
//router.post('/login', authControllers.getLogin);

router.get('/', placesControllers.home);

module.exports = router;