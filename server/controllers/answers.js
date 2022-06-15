var dbconnect = require('../db');

module.exports = {
  get: function (req, res) {
    // console.log('Getting answers from questions_id: ', req.params.question_id);
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
      FROM answers WHERE question_id = $1 AND reported = false
      LIMIT $2 OFFSET $3`;
    dbconnect.query(queryStr,[req.params.question_id, count, (page - 1) * count])
      .then((data) => {
        let sendData = {
          "question": req.params.question_id,
          "page": req.query.page,
          "count": req.query.count,
          "results": data.rows
        }
        res.send(data.rows);
      })
      .catch(err => console.log(err));
  },

  post: function (req, res) {
    console.log('Adding answers: ', req.params.question_id, req.body.body);
    let queryStr = `INSERT INTO answers
    (question_id, body, answerer_name, answerer_email, reported, helpful, timestamp)
    VALUES ($1, $2, $3, $4, $5, $6, now())
    RETURNING answers.id`;

    dbconnect.query(queryStr, [req.params.question_id, req.body.body, req.body.name, req.body.email, false, 0])
      .then((data) => {
        let review_id = data.rows[0].id;
        console.log('This is review_id: ', review_id);
        let queryStr2 = `INSERT INTO answers_photos
        (answer_id, url)
        SELECT $1, UNNEST($2::text[])
        RETURNING *`;
        return dbconnect.query(queryStr2, [review_id, req.body.photos])
      })
      .catch(err => console.log(err))
      .then(() =>
        res.sendStatus(201))
      .catch(err => err);

  }
};