// No specified file, will default to index.js
var controller = require('./controllers');
var router = require('express').Router();

// Set up routes

// This is for getting a list of questions /qa/questions
router.get('/questions', controller.questions.get);

module.exports = router;

