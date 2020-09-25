const PLACE_FOR_PAGE =2;
const Place = require('../models/placeCard');
// /add-place
exports.getAddPlace = (req, res, next) => {
      //res.send(
      //      ' 
      res.render('add-place', {
            pageTitle: 'add-place',
            isAuth: req.isLogin,
           
          });
        };    

    exports.postAddPlace = (req, res, next) => {
      const title = req.body.title;
      const image = req.file;
      const description = req.body.description;
      const area = req.body.area;
      console.log(area);
      const imageUrl = image.path;
      const place = new Place ({
            title:title,
            image: imageUrl, 
            description:description,
            area: area,
            userId: req.user
            
      });
      place.save().then(result =>{
            console.log("Add Place");
      }).catch(err =>{
            console.log(err);
      })
      res.redirect('/');
  };


  exports.getAllPlaces = (req, res, next) => {
      var page=1;
      if (!isNaN(req.query.page) ){
       page= +req.query.page;
      }
      Place.find().countDocuments()
      .then(numPlaces => {
        totalItemsPlace = numPlaces;
        return Place.find()
        .skip((page - 1) * PLACE_FOR_PAGE)
      .limit(PLACE_FOR_PAGE)
      .then(places =>{
            
            res.render('home', {
                  pageTitle: 'all place',
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

        //Delete place
exports.postDeletePlace = (req, res, next) => {
const placeId = req.body.placeId;
Place.findByIdAndRemove(placeId).then(()=>{
      console.log('Delete');
      res.redirect('all-places');
}).catch(err=>{
      console.log(err);
})
};

exports.home = (req, res, next) => {
      var page=1;
      if (!isNaN(req.query.page) ){
       page= +req.query.page;
      }
      Place.find().countDocuments()
      .then(numPlaces => {
        totalItemsPlace = numPlaces;
        return Place.find()
        .skip((page - 1) * PLACE_FOR_PAGE)
      .limit(PLACE_FOR_PAGE)
      .then(places =>{
            
            res.render('home', {
                  pageTitle: 'Home',
                  places: places,
                  isAuth: req.session.isLogin,
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

exports.getDetailsPlace = (req, res, next) => { 
      const placeId = req.params.placeId;
      Place.findById(placeId)
            
            .then(place =>{
                  res.render('place-details', {
                        pageTitle: 'details',
                        isAuth: req.isLogin,
                        place: place,
                      
      
                      });
      }).catch(err =>{
            console.log(err);
      });
     
        };    