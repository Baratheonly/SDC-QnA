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

// Posting an answer
router.post('/questions/:question_id/answers', controller.answers.post);

// Mark question as helpful
router.put('/questions/:question_id/helpful', controller.questions.helpful);

// Report Question
router.put('/questions/:question_id/report', controller.questions.report);

// Mark answer as helpful
router.put('/answers/:answer_id/helpful', controller.answers.helpful);

// Report answer
router.put('/answers/:answer_id/report', controller.answers.report);
module.exports = router;

