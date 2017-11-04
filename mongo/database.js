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

User = mongoose.model('user', UserSchema)

var PostSchema = mongoose.Schema({
    post_name: {type: String},
    post_image: {type: String},
    post_content: {type: String},
    post_time: {type: String},
    post_twitter_time: {type: String},
    post_score: {type: String},
    post_token: {type: String}
})

Post = mongoose.model('post', PostSchema)

exports.User = User
exports.Post = Post

export