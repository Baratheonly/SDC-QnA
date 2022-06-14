// No specified file, will default to index.js
var controller = require('./controllers');
var router = require('express').Router();

// Set up routes

// This is for getting a list of questions /qa/questions
router.get('/questions', controller.questions.get);

// This is for getting a list of answers w/ question_id
router.get('/questions/:question_id/answers', controller.answers.get);

// Posting a question
router.post('/questions', controller.questions.post);

// LOADER IO

router.get(`/loaderio-8ac205ebd510f8a2713c7857bc635aa7`, (req, res) => {
  res.send(`/loaderio-8ac205ebd510f8a2713c7857bc635aa7`);
})

module.exports = router;

