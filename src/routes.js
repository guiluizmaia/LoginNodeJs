const express = require('express');

const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/createUser', UserController.store);

module.exports = routes;