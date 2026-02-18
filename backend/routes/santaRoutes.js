const express = require("express");
const multer = require("multer");
const santaController = require("../controllers/santaController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/generate",
  upload.fields([
    { name: "employees", maxCount: 1 },
    { name: "previous", maxCount: 1 }
  ]),
  santaController.generateSecretSanta
);

module.exports = router;