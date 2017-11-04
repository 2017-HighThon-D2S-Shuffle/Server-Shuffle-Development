module.exports = (router, Users, passport, rndString) => {

    let signin_params = ['id', 'passwd'];

    router.post('/signup', async (req, res) => {
        var new_user = req.body;
        new_user.token = "U" + rndString.generate(46);
        new_user = new Users(new_user);
        try {
            var result = await new_user.save();
        } catch (e) {
            if (e instanceof user_duplicate) return res.status(409).json({message: "already exist"});
            if (e instanceof ValidationError) return res.status(400).json({message: e.message});
        }
        let return_user = {id: new_user.id, token: new_user.token}
        if (result) return res.status(200).json(return_user);
        else return res.status(412).send("fail");
    })
        .post('/login', async (req,res)=>{
            if(check_param(req.body, signin_params)){
                let user = await Users.findOne(req.body);
                if(!user) return res.status(404).json({message: "user not found"});
                let return_user = {id: user.id, token: user.token}
                await res.status(200).json(return_user);
            }
            else res.status(400).send('param missing!');
        })

        .post('/twitter_token', passport.authenticate('twitter-token'), async(req, res)=>{
            if (req.user) {
                let user = await Users.findOne({id: req.user._json.id}, {_id: 0});
                if(user) res.status(200).json({id: user.id, token: user.token});
                else{
                    console.log(req.user._json);
                    let twitter_user = {
                        name: req.user._json.name,
                        id: req.user._json.id,
                        passwd: "null",
                        token: "U"+rndString.generate(),
                    }

                    twitter_user = new Users(twitter_user);

                    try{
                        let result = await twitter_user.save();
                    }catch(e){
                        if(e instanceof ValidationError) return res.status(400).json({message: e.message});
                    }
                    let return_user = {id: twitter_user.id, token: twitter_user.token }
                    if(result) return res.status(200).json(return_user);
                }
            } else res.status(401).send("unauthed");
        })
    return router
}