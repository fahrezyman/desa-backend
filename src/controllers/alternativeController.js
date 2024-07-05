const Alternative = require("../models/alternative");
const AlternativeData = require("../models/alternativeData");
const csv = require("fast-csv");
const fs = require("fs");

exports.uploadData = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const fileRows = [];
  const userId = req.body.user_id;

  if (!userId) {
    return res.status(400).send("User ID is required.");
  }

  console.log(`User ID: ${userId}`);
  console.log(`File Path: ${req.file.path}`);

  try {
    csv
      .parseFile(req.file.path, { headers: true })
      .on("data", (row) => {
        fileRows.push(row);
      })
      .on("end", async () => {
        fs.unlinkSync(req.file.path);

        try {
          const alternativeDataArray = [];

          for (let row of fileRows) {
            console.log(`Processing row: ${JSON.stringify(row)}`);

            const alternative = new Alternative({
              name: row.Nama,
              user_id: userId,
            });
            const alternativeId = await alternative.save();

            console.log(`Saved Alternative ID: ${alternativeId}`);

            const criteriaKeys = Object.keys(row).slice(2);

            criteriaKeys.forEach((key, index) => {
              const value = row[key];
              if (value) {
                alternativeDataArray.push([alternativeId, index + 1, value]);
              }
            });
          }

          await AlternativeData.batchInsert(alternativeDataArray);
          res.send("CSV file has been processed.");
        } catch (error) {
          console.error("Error processing CSV file:", error);
          res.status(500).send(error.message);
        }
      });
  } catch (error) {
    console.error("Error parsing CSV file:", error);
    res.status(500).send(error.message);
  }
};

exports.getAlternatives = async (req, res) => {
  const user_id = req.query.user_id;

  console.log(`Fetching alternatives for User ID: ${user_id}`);

  try {
    const alternatives = await Alternative.getAllByUser(user_id);
    res.json(alternatives);
  } catch (error) {
    console.error("Error fetching alternatives:", error);
    res.status(500).send(error.message);
  }
};
