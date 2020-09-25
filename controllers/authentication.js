const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLogin);
  res.render('login', {
    pageTitle: 'Login',
    isAuth: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('signup', {
    pageTitle: 'Signup',
    isAuth: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5f69e99afd079a21218fe8c1')
    .then(user => {
      req.session.isLogin = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};