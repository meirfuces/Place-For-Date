const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const placeRouter = require('./router/place');
const User = require('.//models/user');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fileStorage = multer.diskStorage({
  destination: (req,file, cb) =>{
    cb(null, 'images')
  },
  filename: (req,file, cb) =>{
    cb(null, '-'+file.originalname)
  }
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage:fileStorage}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));


// for ejs files
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use((req, res, next) => {
  User.findById('5f69e99afd079a21218fe8c1')
    .then(user => {
      req.user = user;
      
      next();
    })
    .catch(err => console.log(err));
});
app.use(placeRouter);

app.use((req, res, next) => {
  res.status(404).send('<h1>404 error!</h1>');
});


app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
const  URL_mongoDB= `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.heeag.gcp.mongodb.net/${process.env.MONGO_DEFULT}`;
mongoose.connect(URL_mongoDB,  {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true}).then(
  res=>{
    User.findOne().then(user => {
      if (!user) {


    const user = new User ({
      name: "meir",
      email: "meir@gmail"

    });
    
    user.save();
  }
});

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
  }
).catch(err=>{
  console.log('mongoose failed');
console.log(err);
}
  );
