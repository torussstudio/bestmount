

const express = require("express");
const router = express.Router();
const upload = require("../multer");
const fs = require("fs");
const path = require("path");

const Product = require("../models/Product");


// ✅ GET all products
router.get("/", async (req, res) => {
  try {

    const products = await Product
      .find()
      .populate("category");

    res.json(products);

  } catch (err) {

    res.status(500).json({
      message: "Failed to fetch products"
    });

  }
});


// ✅ ADD product
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      let colorTones = [];
      let chemicalComposition = [];

      try {

        colorTones = req.body.colorTones
          ? JSON.parse(req.body.colorTones)
          : [];

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

        image: req.file
 ? req.file.path
 : null,
      });


      res.json(product);

    } catch (err) {

      console.log("PRODUCT CREATE ERROR 👉", err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);


// ✅ GET single product
router.get("/:id", async (req, res) => {

  try {

    const product = await Product
      .findById(req.params.id)
      .populate("category");

    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }

    res.json(product);

  } catch {

    res.status(500).json({
      message: "Failed to fetch product"
    });

  }

});


// ✅ UPDATE product (replace OR remove image)
router.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {

    try {

      const existing =
        await Product.findById(req.params.id);

      let imageName = existing.image;


      // CASE 1 — new image uploaded
      if (req.file) {

        imageName = req.file.path;


        // delete old image
        if (existing.image) {

          const oldPath = path.join(
            __dirname,
            "../uploads",
            existing.image
          );

          if (fs.existsSync(oldPath)) {

            fs.unlinkSync(oldPath);

          }

        }

      }


      // CASE 2 — remove image clicked
      else if (req.body.removeImage === "true") {

        if (existing.image) {

          const oldPath = path.join(
            __dirname,
            "../uploads",
            existing.image
          );

          if (fs.existsSync(oldPath)) {

            fs.unlinkSync(oldPath);

          }

        }

        imageName = null;

      }


      let colorTones = [];
      let chemicalComposition = [];

      try {

        colorTones = req.body.colorTones
          ? JSON.parse(req.body.colorTones)
          : [];

      } catch {}

      try {

        chemicalComposition = req.body.chemicalComposition
          ? JSON.parse(req.body.chemicalComposition)
          : [];

      } catch {}


      const updated =
        await Product.findByIdAndUpdate(

          req.params.id,

          {

            ...req.body,

            colorTones,
            chemicalComposition,

            image: imageName,

          },

          { new: true }

        );


      res.json(updated);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Failed to update product"

      });

    }

  }
);


// ✅ DELETE product
router.delete("/:id", async (req, res) => {

  try {

    const product =
      await Product.findById(req.params.id);


    // delete image file
    if (product?.image) {

      const filePath = path.join(
        __dirname,
        "../uploads",
        product.image
      );

      if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

      }

    }


    await Product
      .findByIdAndDelete(req.params.id);


    res.json({

      message: "Product deleted"

    });

  } catch {

    res.status(500).json({

      message:
        "Failed to delete product"

    });

  }

});


module.exports = router;