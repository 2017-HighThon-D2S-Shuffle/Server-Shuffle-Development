var mongoose = require('mongoose')
var DB_NAME = "shuffle"
mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/'+DB_NAME, err=>{
    if(err){
        console.log('DB Error!')
        throw err
    }
    else{
        console.log('DB Connect Success')
    }
})

var UserSchema = mongoose.Schema({
    user_name: {type: String},
    user_id : {type: String},
    user_password: {type: String},
    user_token: {type: String}
})


var PostSchema = mongoose.Schema({
    post_name: {type: String},
    post_image: {type: String},
    post_content: {type: String},
    post_time: {type: String},
    post_twitter_time: {type: String},
    post_score: {type: String},
    post_vote: {type: String},
    post_token: {type: String}
})

var Post = mongoose.model('post', PostSchema)
var User = mongoose.model('user', UserSchema)

exports.User = User
exports.Post = Post
exports.db = db