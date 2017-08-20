var localStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user);
  });
  passport.deserializeUser(function(obj, done){
    done(null, obj);
  });
  passport.use(new localStrategy({
    passReqToCallback : true
  }, function(req, email, password, done){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.query('SELECT * FROM users WHERE email = ?', email, function(err, rows,fields){
      if(err) throw err;
      db.end();
      if(rows.length>0){
        var user = rows[0];
        if(bcrypt.compareSync(password, user.password)){
          return done(null, {
            id: user.id,
            user_name : user.user_name,
            email : email

          });
        }
      }
      return done(null, false, req.flash('authmessage', 'Invalid Email or Password'));
    });

  }));
};
