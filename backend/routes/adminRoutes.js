const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Admin = require("../models/Admin");
const authenticateToken = require("../middleware/auth");

// Cookie options for security
// const isProduction = process.env.NODE_ENV === "production";

// const cookieOptions = {
//   httpOnly: true,
//   secure: isProduction,
//   sameSite: isProduction ? "none" : "lax",
//   path: "/",
//   maxAge: 15 * 60 * 1000, // 15 minutes
// };

// const refreshCookieOptions = {
//   httpOnly: true,
//   secure: isProduction,
//   sameSite: isProduction ? "none" : "lax",
//   path: "/",
//   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
// };

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 15 * 60 * 1000,
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// POST /api/admin/login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password with bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Set HttpOnly cookies
    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("refresh_token", refreshToken, refreshCookieOptions);

    res.json({
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
});

// POST /api/admin/refresh - Refresh access token
router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate new access token
    const newAccessToken = jwt.sign(
      { adminId: decoded.adminId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Set new access token cookie
    res.cookie("access_token", newAccessToken, cookieOptions);

    res.json({ message: "Token refreshed" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

// GET /api/admin/me - Get current admin info (protected)
router.get("/me", authenticateToken, async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/logout
router.post("/logout", (req, res) => {
  res.clearCookie("access_token", cookieOptions);
res.clearCookie("refresh_token", refreshCookieOptions);
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
