const Alternative = require("../models/alternative");
const AlternativeData = require("../models/alternativeData");
const Criteria = require("../models/criteria");
const Evaluation = require("../models/evaluation");
const pdf = require("pdfkit");

exports.calculateSAW = async (req, res) => {
  try {
    const user_id = req.user.id; // Assuming req.user contains the authenticated user's info
    const alternatives = await Alternative.getAllByUser(user_id);
    const criteria = await Criteria.getAllByUser(user_id);
    const evaluations = [];

    for (let alternative of alternatives) {
      const alternativeData = await AlternativeData.getByAlternativeId(
        alternative.id
      );
      let score = 0;
      for (let data of alternativeData) {
        const criterion = criteria.find((c) => c.id === data.criteria_id);
        const value = criterion.isBenefit
          ? data.value / Math.max(...alternativeData.map((d) => d.value))
          : Math.min(...alternativeData.map((d) => d.value)) / data.value;
        score += value * criterion.weight;
      }
      const evaluation = new Evaluation({
        alternative_id: alternative.id,
        score,
        user_id,
      });
      await evaluation.save();
      evaluations.push(evaluation);
    }

    res.json(evaluations);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.exportPDF = async (req, res) => {
  try {
    const user_id = req.user.id; // Assuming req.user contains the authenticated user's info
    const evaluations = await Evaluation.getAllByUser(user_id);
    const doc = new pdf();
    let filename = "results.pdf";
    res.setHeader("Content-disposition", "attachment; filename=" + filename);
    res.setHeader("Content-type", "application/pdf");

    doc.text("Results");
    evaluations.forEach((evaluation) => {
      doc.text(
        `Alternative ID: ${evaluation.alternative_id}, Score: ${evaluation.score}`
      );
    });

    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
