module.exports = twitter

function twitter(app, db, passport, AppTwitterStrategy, rndString) {

    passport.use(new AppTwitterStrategy({
            consumerKey: 'taMJ7d17CdfEwryYawu76l3h8',
            consumerSecret: 'taMJ7d17CdfEwryYawu76l3h8'
        }, (token, tokenSecret, profile, done)=>{
            console.log(token)
            console.log(tokenSecret)
            console.log(profile)
            done(null, profile)
        }
    ));

    app.get('/auth/twitter/token', passport.authenticate('twitter-token'), (req, res)=>{
        console.log('asdf')
        console.log(req.param('oauth_token'))
        console.log(req.param('oauth_token_secret'))
        if(req.user){
            db.User.findOne({
                user_token : req.param('oauth_token')
            },(err, result)=>{
                if(err){
                    console.log('/auth/twitter/token userfind Error')
                    res.send(500, '/auth/twitter/token userfind Error')
                    throw err
                }
                else if(result){
                    res.send(200, result)
                }
                else {
                    var saveuser = new db.User({
                        user_name : req.user.diplayName,
                        user_id : req.user.id,
                        user_password : rndString.generate(10),
                        user_token : req.param('oauth_token')
                    })
                    saveuser.save((err)=>{
                        if(err){
                            console.log('/auth/twitter/token usersave Error')
                            res.send(500, '/auth/twitter/token usersave Error')
                            throw err
                        }
                        else {
                            res.send(200, saveuser)
                        }
                    })
                }
            })
        }
    });
}