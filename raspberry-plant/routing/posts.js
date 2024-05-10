const queryTools = require('../mongo');
const { Router } = require('express');
const app = Router();

// Get a single post
app.get('/api/posts/:id', function(request, response) {
    queryTools.getPost(request.params.id).then((post) => {
        if (post) {
            response.status(200).json(post);
        } else {
            response.status(404).send('No posts found').end();
        }
    });
});

// Search for posts
app.get('/api/posts/', function(request, response) {
    // TODO, add more query params in
    queryTools.searchPosts().then((posts) => {
        if (posts) {
            response.status(200).json(posts);
        } else {
            response.status(404).send('No posts found').end();
        }
    });
});

// Create new post
app.post('/api/post/', function(request, response)  {
    const postBody = request.body;

    // Temp to be replaced by grabbing mongo id for posts in response.
    const IDGenerator = function() {
        const newPostID = Math.pow(Math.floor(Math.random() * 10000), 5);

        return newPostID
    }

    if (!postBody.content) {
        return response.status(400).json({
            error: 'Request contains no content'
        });
    }

    const post = {
        content: postBody.content,
        id: IDGenerator(),
        date: new Date(),
        community: postBody.community,
        tags: postBody.tags
    }

    queryTools.post(post).then((results) => {
    
        console.log(results);
        response.status(200).json(results);
    });
});

// Delete post
app.delete('/api/post/:id', function(request, response) {
    queryTools.deletePost(request.params.id).then((results) => {
        if (results) {
            response.status(200).send('Post Deleted').end();
        } else {
            response.status(404).send('Post not found').end();
        }
    });
});

module.exports = app;