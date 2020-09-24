const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('login', {
    pageTitle: 'Login',
 
  });
};

