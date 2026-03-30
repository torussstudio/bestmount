const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Product = require("../models/Product");

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// ADD category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to add category" });
  }
});

// UPDATE category
router.put("/:id", async (req, res) => {
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
    res.status(500).json({ message: "Failed to update category" });
  }
});

// DELETE category (blocked if products are linked)
router.delete("/:id", async (req, res) => {
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
    res.status(500).json({ message: "Failed to delete category" });
  }
});

module.exports = router;
