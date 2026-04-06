const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT access token from HttpOnly cookie
 */
const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - No access token"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token"
    });
  }
};

module.exports = authenticateToken;