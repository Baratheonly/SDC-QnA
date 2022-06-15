var dbconnect = require('../db');

module.exports = {
  get: function (req, res) {
    // console.log('Getting Questions from product_id: ', req.query.product_id);
    let count = req.query.count || 5;
    let page = req.query.page || 1;
    let queryStr = `SELECT
      id AS "question_id",
      body AS "question_body",
      timestamp AS "question_date",
      asker_name,
      helpful AS "question_helpfulness",
      reported,
      (SELECT json_object_agg(
        answers.id, json_build_object(
          'id', id,
          'body', body,
          'date', timestamp,
          'answerer_name', asker_name,
          'helpfulness', helpful,
          'photos', (SELECT COALESCE(json_agg(json_build_object(
            'id', id,
            'url', url)), '[]')
            AS photos FROM answers_photos
            WHERE answer_id=answers.id)))
            AS answers FROM answers
            WHERE question_id=questions.id)
            FROM questions WHERE product_id = $1 AND reported = false
            LIMIT $2 OFFSET $3`;
    dbconnect.query(queryStr,[req.query.product_id, count, (page - 1) * count])
      .then((data) => {
        let sendData = {
          "product_id": req.query.product_id,
          "results": data.rows
        }
        res.send(sendData);
      })
      .catch(err => console.log(err));
  },

  post: function (req, res) {
    console.log('Posting Question for product_id: ', req.body.product_id);
    let queryStr = `INSERT INTO questions
    (product_id, body, timestamp, asker_name, asker_email, reported, helpful)
    VALUES ($1, $2, now(), $3, $4, $5, $6)`;
    dbconnect.query(queryStr, [req.body.product_id, req.body.body, req.body.name, req.body.email, false, 0])
      .then(() => res.sendStatus(201))
      .catch((err) => console.log(err));
  }
};