const mongoose = require('mongoose');
require('dotenv').config();

var password = process.env.MONGO_PASSWORD;
var username = process.env.MONGO_USER;
if (!password.length || !username.length) {
    console.log('DB Username & Password misconfigured');
    process.exit(1);
}

const url = `mongodb+srv://${username}:${password}@cluster0.oerieub.mongodb.net/nodo?retryWrites=true&w=majority`;
if (!url.length) {
    console.log('DB URI invalid');
    process.exit(1);
}

const connectToMongo = async() => {
    mongoose.set('strictQuery', false);
    
    await mongoose.connect(url);
    return mongoose;
};

connectToMongo();

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    postedon: Date,
    comments: Object,
    userid: String,
    communities: Object,
    tags: Object
});
        
const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = {
    post: async function (postData) {
        await connectToMongo();
        
        const post = new Post({
            title: postData.title,
            content: postData.content,
            postedon: new Date().toISOString(),
            comment: [],
            userid: postData.userid,
            communities: postData.communities,
            tags: postData.tags
        });

        post.save().then(result => {
            mongoose.connection.close();
            return result;
        });
    },
    getPost: async function(id) {
        await connectToMongo();

        var post = await Post.find({ _id: id });

        mongoose.connection.close();
        
        return post;
    },
    searchPosts: async function(user, tags, communities, contentKeywords, titleKeywords) {
        await connectToMongo();

        var posts = await Post.find();

        mongoose.connection.close();

        return posts;
    },
    deletePost: async function(id) {
        await connectToMongo();

        var deletePost = await Post.findByIdAndDelete({_id: id})

        mongoose.connection.close();

        return deletePost;
    }
}