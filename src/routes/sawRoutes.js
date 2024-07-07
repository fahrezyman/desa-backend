const express = require("express");
const { calculateSAW } = require("../controllers/sawController");

const router = express.Router();

router.post("/calculate", calculateSAW);

module.exports = router;
