const express = require("express");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const msdsRoutes = require("./routes/msds");
const authenticateToken = require("./middleware/auth");

const app = express();

connectDB();

// Trust reverse proxy (Render) to allow secure cross-domain HTTPS cookies
app.set("trust proxy", 1);

// ✅ Gzip compress all responses
app.use(compression());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bestmount-kappa.vercel.app",
  "https://bestmount-kappa.vercel.app/"
];

app.use(cors({
  origin: (origin, callback) => {

    // allow requests with no origin (mobile apps, postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", origin);
    callback(null, false);
  },
  credentials: true
}));

// Enable cookie parsing
app.use(cookieParser());

app.use(express.json());

// Public routes
app.use("/api/admin", adminRoutes);

// Public routes for listing products and categories
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/msds", msdsRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Centralized API error handler (prevents multer/parse failures from becoming opaque 500s)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("API ERROR:", err);

  const status = err?.statusCode || err?.status || 500;
  const message = err?.message || (status >= 500 ? "Internal server error" : "Bad request");

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
