var dbconnect = require('../db');

module.exports = {
  get: function (req, res) {
    console.log('Getting answers from questions_id: ', req.params.question_id);
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    let queryStr = `SELECT
      id AS "answers_id",
      body,
      timestamp AS "date",
      answerer_name,
      helpful AS "helpfulness",
      (SELECT COALESCE(json_agg(json_build_object(
          'id', id,
          'url', url)), '[]')
          AS photos FROM answers_photos
          WHERE answer_id = answers.id)
      FROM answers WHERE question_id = $1 AND reported = false`;
    dbconnect.query(queryStr,[req.params.question_id[1]])
      .then((data) => {
        let sendData = {
          "question": req.params.question_id[1],
          "page": req.query.page,
          "count": req.query.count,
          "results": data.rows
        }
        res.send(data.rows);
      })
      .catch(err => console.log(err));
  }
};