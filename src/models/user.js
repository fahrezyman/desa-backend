// src/models/user.js
const db = require("../config/db");

class User {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role || "user";
  }

  save() {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)",
        [this.username, this.password, this.email, this.role],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Users WHERE username = ?",
        [username],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }
}
module.exports = User;
