//const queryTools = require('./mongo');
const { Router } = require('express');
const app = Router();

app.get('/', function(request, response) {
    response.send('<h1>Hello World!</h1>')
});

module.exports = app;