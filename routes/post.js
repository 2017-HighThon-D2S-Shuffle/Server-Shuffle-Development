module.exports = (router, Posts, rndString, moment) => {

    let signin_params = ['id', 'passwd'];

    router.post('/upload', async (req, res) => {
        var new_post = req.body;
        var post_time = new Date()
        new_post.token = "P" + rndString.generate(46);
        new_post.post_time = post_time
        new_post.post_score = ""
        new_post = new Posts(new_post)
        try {
            var result = await new_post.save();
        } catch (e) {
            if (e instanceof post_duplicate) return res.status(409).json({message: "already exist"});
            if (e instanceof ValidationError) return res.status(400).json({message: e.message});
        }
        let return_post = {id: new_post.id, token: new_post.token}
        if (result) return res.status(200).json(return_post);
        else return res.status(412).send("fail");
    })

        .post('/load', (req, res)=>{
            Posts.find().sort({post_time: -1}).exec(function (err, result) {
                if(err){
                    throw err;
                }
                var temp_result = { "responseData" : result };
                res.send(200, temp_result);
            });
        })

        .post('/shape', (req, res)=>{

        })


    return router
}