const db = require("../config/db");

class Criteria {
  constructor({ name, weight, isBenefit, user_id }) {
    this.name = name;
    this.weight = weight;
    this.isBenefit = isBenefit;
    this.user_id = user_id;
  }

  save() {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO Criteria (name, weight, isBenefit, user_id) VALUES (?, ?, ?, ?)",
        [this.name, this.weight, this.isBenefit, this.user_id],
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
        "SELECT * FROM Criteria WHERE user_id = ?",
        [user_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}

module.exports = Criteria;
