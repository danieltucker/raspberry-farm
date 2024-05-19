const express = require('express');
const app = express();
app.use(express.json());

// Routing
const home = require('./routing/home');
const posts = require('./routing/posts');
app.use(home);
app.use(posts);

// Server Configuration
const PORT = 3001;
app.listen(
    PORT,
    function() {
        console.log(`Server running on port ${PORT}`);
    }
);