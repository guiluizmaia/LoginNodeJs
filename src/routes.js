const express = require('express');

const UserController = require('./controllers/UserController');

const routes = express.Router();


routes.post('/login', UserController.index);
routes.post('/createUser', UserController.store);

module.exports = routes;