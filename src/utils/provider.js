const passport = require('passport');
const Users = require('../models/users_modele');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Googlestrategy = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/v1/user/callback"
      },
      async function(accessToken, refreshToken, profile, cb) {
        
        console.log("profile",profile);

        const user = await Users.findOne({ googleId: profile.id })

        if(!user){
            const user = await Users.create({
                googleId: profile.id ,
                name : profile.displayName,
                email : profile.emails[0].value,
                role : 'user'
            })
            return cb(null, user)
        }

         return cb(null, user)
        // await Users.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     console.log(user, "ddddddd", err);
            
        //   return cb(err, user);
        // });
      }
    ));

    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });
    
    passport.deserializeUser(async function(_id, done) {
      try {
        const user = await Users.findById(_id)
        done(null, user);
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    });
}

module.exports = Googlestrategy