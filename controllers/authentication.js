const User = require('../models/user');
//const sendGridTransporter = require('nodemailer-sendgrid-transport');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator/check');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('login', {
    pageTitle: 'Login',
    isAuth: false,
    errorMessage: message
  });
};



exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
 
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'אימייל זה לא נמצא במערכת, אנא נסה שנית');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(Match => {
          if (Match) {
            req.session.isLogin = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'סיסמא לא נכונה, אנא נסה שנית');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};
// >> SignUp

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('signup', {
    pageTitle: 'SignUp',
    isAuth: false,
    errorMessage: message,
    oldInput: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};
exports.postSignup = (req, res, next) => {
  const name = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  // if (password !== req.body.confirmPassword){
  //   req.flash('error', 'סיסמא לא מתאימה, אנא הזן שנית');
  //   return res.redirect('/signup');
  
  // }
  const errors = validationResult(req);
  if (!errors.isEmpty()){

    return res.status(422).render('signup', {
      pageTitle: 'SignUp',
      isAuth: false,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        userName: name,
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }
  User.findOne({ email: email })
    .then(userExsict => {
      if (userExsict) {
        req.flash('error', 'אימייל קיים במערכת, אנא בחר אחר.');
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            cart: { places: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
    })
    .catch(err => {
      console.log(err);
    });
};



exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};