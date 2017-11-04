module.exports = (router, Users, rndString) => {

    let signin_params = ['user_id', 'user_password'];

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

        .post('/remove', (req,res)=>{
            User.findOne({
                id:req.param('user_id')
            }, (err,result)=>{
                if(err){
                    console.log('/remove Error')
                    throw err
                }
                if(result){
                    if(result.password==req.param('user_password')){
                        user.remove({id: req.param('user_id')}, function(err){
                            if(err){
                                console.log('remove Error')
                                throw err
                            }
                            else{
                                console.log(result.username+' user remove success')
                                res.json({
                                    success: true,
                                    message: "user delete success"
                                })
                            }
                        })
                    }
                    else if(result.password != req.param('user_password')){
                        console.log(result.username+' password Error')
                        res.json({
                            success: false,
                            message: "Password Error"
                        })
                    }
                }
                else{
                    console.log('User Not Founded')
                    res.json({
                        success: false,
                        message: "user not founded"
                    })
                }
            })
        })

        .post('/logout', (req,res)=>{
            User.findOne({
                id:req.param('user_id')
            }, (err,result)=>{
                if(err){
                    console.log('/remove Error')
                    throw err
                }
                if(result){
                    if(result.password==req.param('user_password')){
                        user.remove({id: req.param('user_id')}, function(err){
                            if(err){
                                console.log('remove Error')
                                throw err
                            }
                            else{
                                console.log(result.username+' user remove success')
                                res.json({
                                    token: null,
                                    success: true,
                                    message: "user logout success"
                                })
                            }
                        })
                    }
                    else if(result.password != req.param('password')){
                        console.log(result.username+' password Error')
                        res.json({
                            success: false,
                            message: "Password Error"
                        })
                    }
                }
                else{
                    console.log('User Not Founded')
                    res.json({
                        success: false,
                        message: "user not founded"
                    })
                }
            })
        })
    return router
}