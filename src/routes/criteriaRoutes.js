const express = require("express");
const criteriaController = require("../controllers/criteriaController");

const router = express.Router();

router.post("/", criteriaController.addCriteria);
router.get("/", criteriaController.getCriteria);

module.exports = router;
