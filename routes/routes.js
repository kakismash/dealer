var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/auth');

router.get('/', controllers.Homecontroller.index);

//users routes
router.get('/auth/newuser', AuthMiddleware.isLogged,controllers.Usercontroller.getNewUser);
router.post('/auth/newuser', controllers.Usercontroller.postNewUser);
router.get('/auth/signin', controllers.Usercontroller.getSignIn);
router.get('/auth/logout', controllers.Usercontroller.logout);
router.post('/auth/signin', passport.authenticate('local', {
  successRedirect : '/users/panel',
  failureRedirect : '/auth/signin',
  failureFlash : true
}));
router.get('/users/panel', AuthMiddleware.isLogged, controllers.Usercontroller.getUserPanel);
module.exports = router;
