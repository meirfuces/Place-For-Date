const PLACE_FOR_PAGE =2;
const Place = require('../models/placeCard');

exports.getJerusalemPlaces = (req, res, next) => {
      var page=1;
      if (!isNaN(req.query.page) ){
       page= +req.query.page;
      }
      Place.find({area: 'jerusalem'}).countDocuments().exec()
      .then(numPlaces => {
        totalItemsPlace = numPlaces;
        return Place.find({area: 'jerusalem'})
        .skip((page - 1) * PLACE_FOR_PAGE)
      .limit(PLACE_FOR_PAGE)
      .then(places =>{
            
            res.render('home', {
                  pageTitle: 'Jerusalem',
                  isAuth: req.session.isLogin,
                  places: places,
                  currentPage: page,
                  hasNextPage: PLACE_FOR_PAGE * page < totalItemsPlace,
                  hasPreviousPage: page > 1,
                  nextPage: page + 1,
                  previousPage: page - 1,
                  lastPage: Math.ceil(totalItemsPlace / PLACE_FOR_PAGE)

                });
      }).catch(err =>{
            console.log(err);
      });
});
};


exports.getCenterPlaces = (req, res, next) => {
      var page=1;
      if (!isNaN(req.query.page) ){
       page= +req.query.page;
      }
      Place.find({area: 'center'}).countDocuments().exec()
      .then(numPlaces => {
        totalItemsPlace = numPlaces;
        return Place.find({area: 'center'})
        .skip((page - 1) * PLACE_FOR_PAGE)
      .limit(PLACE_FOR_PAGE)
      .then(places =>{
            
            res.render('home', {
                  pageTitle: 'Center',
                  isAuth: req.session.isLogin,
                  places: places,
                  currentPage: page,
                  hasNextPage: PLACE_FOR_PAGE * page < totalItemsPlace,
                  hasPreviousPage: page > 1,
                  nextPage: page + 1,
                  previousPage: page - 1,
                  lastPage: Math.ceil(totalItemsPlace / PLACE_FOR_PAGE)

                });
      }).catch(err =>{
            console.log(err);
      });
});
};
