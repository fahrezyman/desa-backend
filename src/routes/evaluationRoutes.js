const express = require("express");
const evaluationController = require("../controllers/evaluationController");

const router = express.Router();

router.get("/calculate", evaluationController.calculateSAW);
router.get("/export", evaluationController.exportPDF);

module.exports = router;
