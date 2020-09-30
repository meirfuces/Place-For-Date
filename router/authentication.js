const express = require('express');

const {check, body} = require('express-validator/check');
const router = express.Router();


const authController = require('../controllers/authentication');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.post('/logout', authController.postLogout);

router.get('/signup',authController.getSignup);

router.post('/signup', [
      check('email')
      .isEmail()
      .withMessage('אנא הקש אימייל חוקי') ,

body('password').isLength({min:4}).withMessage('הסיסמא צריכה להיות מעל 4 תווים, אנא הרשם שנית'),
body('confirmPassword').custom((value,{req}) =>{
      if (value !==req.body.password){
            throw new Error ('הסיסמא צריכה להיות תואמת, נא הקש שנית');
      }
      return true;
})]
      ,authController.postSignup);
module.exports = router;

