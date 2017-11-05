var express = require('express');
var rndString = require('randomstring')
var router = express.Router();
var db = require('../mongo/database')
let signin_params = ['id', 'passwd'];

function init(router, Posts, rndString){
    router.post('/upload', (req, res) => {
        var new_post = req.body;
        var post_time = new Date()
        new_post.token = "P" + rndString.generate(46);
        new_post.post_time = post_time
        new_post.post_score = "2.5"
        new_post.post_vote = "0"
        new_post = new Posts(new_post)
        try {
            var result = new_post.save();
        } catch (e) {
            if (e instanceof post_duplicate) return res.status(409).json({message: "already exist"});
            if (e instanceof ValidationError) return res.status(400).json({message: e.message});
        }
        let return_post = {post_id: new_post.id, post_token: new_post.token}
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
            Posts.findOne({token:req.param('token')}, (err, result)=>{
                if(err){
                    throw err
                }
                else if(result){

                    var vote = post_vote.parseInt() + 1
                    var score = ((post_score.parseInt() * post_vote) + req.param('shape').parseInt()) / (post_vote.parseInt() + 1)

                    Post.update({
                        token : req.param('token')
                    }, {$set:{post_vote:vote}}, {$set:{post_score:score}}, (err)=>{
                        if(err){
                            console.log('/twitter_token scoreupdate Error')
                            res.send(500, '/twitter_token scoreupdate Error')
                            throw err
                        }
                        else {
                            res.send(200, post_score)
                        }
                    })
                }
                return res.status(200).send("success")
            })
        })

        .post('/browse', (req, res)=>{
            Posts.find().sort(post_score.parseInt()).exec(function (err, result) {
                if(err){
                    throw err;
                }
                var temp_result = { "responseData" : result };
                res.send(200, temp_result);
            });
        })
    return router;
}

module.exports = init(router, db.Post, rndString);