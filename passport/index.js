var passport = require('passport');
var TwitterTokenStrategy = require('passport-twitter-token');

let ids = require('./social');

module.exports = () =>{
    passport.serializeUser((user, done)=>{
        done(null, user);
    });

    passport.deserializeUser((obj, done)=>{
        done(null, obj);
    });

    passport.use(new TwitterTokenStrategy({
            consumerKey: taMJ7d17CdfEwryYawu76l3h8,
            consumerSecret: HP5DnImIzU93aJI9M1Xopiku5I97baIzuy6aCZUFgRznYWGbn6
        }, function(token, tokenSecret, profile, done) {
            User.findOrCreate({ twitterId: profile.id }, function (error, user) {
                return done(error, user);
            })
        }
    ))

    return passport
}