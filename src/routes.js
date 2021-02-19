const express = require('express');

const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');
const authMiddleware = require('./middleware/auth');
const routes = express.Router();


routes.post('/login', UserController.index);
routes.post('/createUser', UserController.store);
//routes.use(authMiddleware)
routes.get('/project',authMiddleware ,ProjectController.index);

module.exports = routes;