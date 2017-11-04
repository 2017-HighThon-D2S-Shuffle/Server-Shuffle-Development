module.exports = twitter

function twitter(app, db, passport, AppTwitterStrategy, rndString) {

    passport.use(new AppTwitterStrategy({
            consumerKey: 'taMJ7d17CdfEwryYawu76l3h8',
            consumerSecret: 'HP5DnImIzU93aJI9M1Xopiku5I97baIzuy6aCZUFgRznYWGbn6'
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
                    let user =  db.User.findOne({id: req.user._json.id}, {_id: 0});
                    let return_user = {user_id: user.id, user_token: user.token }
                    return res.status(200).json(return_user)
                }
                else {
                    var saveuser = new db.User({
                        user_name : req.user.name,
                        user_id : req.user.id,
                        user_password : rndString.generate(10),
                        user_token : req.param('oauth_token')
                    })
                    let return_user = {id: saveuser.id, token: saveuser.token }
                    saveuser.save((err)=>{
                        if(err){
                            console.log('/auth/twitter/token usersave Error')
                            res.send(500, '/auth/twitter/token usersave Error')
                            throw err
                        }
                        else {
                            return res.status(200).json(return_user)
                        }
                    })
                }
            })
        }
    });
}