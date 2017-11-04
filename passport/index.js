module.exports = () =>{

    passport.serializeUser((user, done)=>{
        done(null, user);
    });

    passport.deserializeUser((obj, done)=>{
        done(null, obj);
    });

    passport.use(new TwitterTokenStrategy({
            consumerKey: 'taMJ7d17CdfEwryYawu76l3h8',
            consumerSecret: 'HP5DnImIzU93aJI9M1Xopiku5I97baIzuy6aCZUFgRznYWGbn6'
        }, (token, tokenSecret, profile, done)=>{

        }
    ))

    return passport
}