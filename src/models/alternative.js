const db = require("../config/db"); // Ganti dengan konfigurasi database Anda

class Alternative {
  constructor({ name, user_id }) {
    this.name = name;
    this.user_id = user_id;
  }

  async save() {
    const [result] = await db.execute(
      "INSERT INTO alternatives (name, user_id) VALUES (?, ?)",
      [this.name, this.user_id]
    );
    return result.insertId; // pastikan result[0] untuk mendapatkan hasil dari kueri
  }

  static async getAllByUser(user_id) {
    const [rows] = await db.execute(
      "SELECT * FROM alternatives WHERE user_id = ?",
      [user_id]
    );
    return rows;
  }
}

module.exports = Alternative;
