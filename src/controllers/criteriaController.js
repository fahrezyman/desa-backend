const Criteria = require("../models/criteria");

exports.addCriteria = async (req, res) => {
  try {
    const user_id = req.user.id; // Assuming req.user contains the authenticated user's info
    const criteria = req.body.map(
      (criterion) => new Criteria({ ...criterion, user_id })
    );
    for (let criterion of criteria) {
      await criterion.save();
    }
    res.send("Criteria saved successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCriteria = async (req, res) => {
  try {
    const user_id = req.user.id; // Assuming req.user contains the authenticated user's info
    const criteria = await Criteria.getAllByUser(user_id);
    res.json(criteria);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
