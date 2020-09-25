exports.getEroor = (req, res, next) => {
      console.log(req.session.isLogin);
      res.render('error', {
        pageTitle: 'error',
        isAuth: false
      });
    };