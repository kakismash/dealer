var mysql = require('mysql');
var bcrypt = require('bcryptjs');


module.exports= {
    getNewUser : function(req, res, next){
      res.render('users/newuser', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user
      });
    },
    postNewUser : function(req, res, next){
      var salt = bcrypt.genSaltSync(10);
      var password = bcrypt.hashSync(req.body.password, salt);
      var state = false;
      if(req.body.access_level == 'on')
        {state = true;}
      var user = {
        email : req.body.email,
        user_name : req.body.username,
        password : password,
        phone : req.body.phone,
        access_level : state
      };
      var config = require('.././database/config');

      var db = mysql.createConnection(config);
      db.connect();
      db.query(' INSERT INTO users SET ?', user, function(err, rows, fields){
        if(err) throw err;
        db.end();
      });
      req.flash('info', 'Se a registrado correctamente, ya puede iniciar sesion');



return res.redirect('/');
  },
    getSignIn : function(req, res, next){
      return res.render('users/signin', {message : req.flash('info')});
    },
    logout : function(req, res, next){
      req.logout();
      res.redirect('/auth/signin');
    },
    getUserPanel : function(req, res, next){
      res.render('users/panel', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user
      });
    }
}
