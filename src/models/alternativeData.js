const db = require("../config/db"); // Ganti dengan konfigurasi database Anda

class AlternativeData {
  static async batchInsert(data) {
    const [result] = await db.query(
      "INSERT INTO alternative_data (alternative_id, criteria_id, value) VALUES ?",
      [data]
    );
    return result;
  }
}

module.exports = AlternativeData;
