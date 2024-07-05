const db = require("../config/db");

class Evaluation {
  constructor({ alternative_id, score, user_id }) {
    this.alternative_id = alternative_id;
    this.score = score;
    this.user_id = user_id;
  }

  save() {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO Evaluations (alternative_id, score, user_id) VALUES (?, ?, ?)",
        [this.alternative_id, this.score, this.user_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result.insertId);
        }
      );
    });
  }

  static getAllByUser(user_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Evaluations WHERE user_id = ?",
        [user_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}

module.exports = Evaluation;
