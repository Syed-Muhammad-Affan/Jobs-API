const express = require('express');
const Router = express.Router();
const { register } = require('../controllers/auth');

Router.post('/register', register);

module.exports = Router;
