const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

const Category = require("../models/Category");
const Product = require("../models/Product");

// GET all categories
router.get("/", async (req, res) => {
  try {
    console.log("GET /api/categories called");
    const categories = await Category.find().lean();
    console.log(`Fetched ${categories.length} categories from DB`);
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// ADD category
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });

    res.json(category);
  } catch (err) {
    next(err);
  }
});

// UPDATE category
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE category (blocked if products are linked)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    // Check if any products reference this category
    const linkedCount = await Product.countDocuments({
      category: req.params.id,
    });
    if (linkedCount > 0) {
      return res.status(400).json({
        message: `Cannot delete this category because it is used by ${linkedCount} existing product${linkedCount === 1 ? "" : "s"}.`,
      });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
