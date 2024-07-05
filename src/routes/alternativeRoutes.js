const express = require("express");
const multer = require("multer");
const alternativeController = require("../controllers/alternativeController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), alternativeController.uploadData);
router.get("/", alternativeController.getAlternatives);

module.exports = router;
