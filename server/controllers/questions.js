var dbconnect = require('../db');

module.exports = {
  get: function (req, res) {
    console.log('Getting Questions');
    let queryStr = `SELECT * FROM questions WHERE id=1`
    dbconnect.query(queryStr)
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch(err => console.log(err));
  }
};