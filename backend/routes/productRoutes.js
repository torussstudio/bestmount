const express = require("express");
const router = express.Router();
const upload = require("../multer");
const fs = require("fs");
const path = require("path");

const Product = require("../models/Product");

// ✅ GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
});

// ✅ ADD product
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "msds", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let colorTones = [];
      let chemicalComposition = [];

      try {
        colorTones = req.body.colorTones ? JSON.parse(req.body.colorTones) : [];
      } catch {}

      try {
        chemicalComposition = req.body.chemicalComposition
          ? JSON.parse(req.body.chemicalComposition)
          : [];
      } catch {}

      const product = await Product.create({
        ...req.body,

        colorTones,
        chemicalComposition,

        image: req.files?.image ? req.files.image[0].path : null,

        msds: req.files?.msds ? req.files.msds[0].path : null,
      });

      res.json(product);
    } catch (err) {
      console.log("PRODUCT CREATE ERROR 👉", err);

      res.status(500).json({
        message: err.message,
      });
    }
  },
);

// ✅ GET single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch {
    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
});
// ✅ DOWNLOAD MSDS
router.get("/msds/:id", async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product?.msds) {
      return res.status(404).json({
        message: "MSDS not found"
      });
    }

    const fileName = product.msds.split("/").pop() + ".pdf";

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/pdf");

    const https = require("https");

    https.get(product.msds, (fileStream) => {
      fileStream.pipe(res);
    });

  } catch (err) {

    res.status(500).json({
      message: "Download failed"
    });

  }

});
// ✅ UPDATE product (replace OR remove image)
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "msds", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const existing = await Product.findById(req.params.id);

      let imageName = existing.image;
      let msdsFile = existing.msds;

      // update image
      if (req.files?.image) {
        imageName = req.files.image[0].path;
      }

      // remove image
      if (req.body.removeImage === "true") {
        imageName = null;
      }

      // update msds pdf
      if (req.files?.msds) {
        msdsFile = req.files.msds[0].path;
      }

      let colorTones = [];
      let chemicalComposition = [];

      try {
        colorTones = req.body.colorTones ? JSON.parse(req.body.colorTones) : [];
      } catch {}

      try {
        chemicalComposition = req.body.chemicalComposition
          ? JSON.parse(req.body.chemicalComposition)
          : [];
      } catch {}

      const updated = await Product.findByIdAndUpdate(
        req.params.id,

        {
          ...req.body,

          colorTones,
          chemicalComposition,

          image: imageName,
          msds: msdsFile,
        },

        { new: true },
      );

      res.json(updated);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Failed to update product",
      });
    }
  },
);

// ✅ DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted",
    });
  } catch {
    res.status(500).json({
      message: "Failed to delete product",
    });
  }
});

module.exports = router;
