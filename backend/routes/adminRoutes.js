const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid username" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
