const express = require("express");
const router = express.Router();
const upload = require("../multer");

// upload pdf
const authenticateToken = require("../middleware/auth");

router.post("/upload", authenticateToken, upload.single("msds"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No pdf uploaded",
      });
    }

    res.json({
      message: "MSDS uploaded successfully",

      file: req.file.path || req.file.filename,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "upload error",
    });
  }
});

module.exports = router;
