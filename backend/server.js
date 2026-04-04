const express = require("express");
const cors = require("cors");
const compression = require("compression");
require("dotenv").config();

const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const msdsRoutes = require("./routes/msds");

const app = express();

connectDB();

// ✅ Gzip compress all responses
app.use(compression());

app.use(
  process.env.CORS_ORIGIN
    ? cors({
        origin: process.env.CORS_ORIGIN.split(",").map((s) => s.trim()),
      })
    : cors(),
);

app.use(express.json());

app.use("/api/admin", adminRoutes);
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
  const message =
    err?.message || (status >= 500 ? "Internal server error" : "Bad request");

  res.status(status).json({
    message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
