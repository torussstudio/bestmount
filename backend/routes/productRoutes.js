const express = require("express");
const https = require("https");
const router = express.Router();
const upload = require("../multer");

const Product = require("../models/Product");

function isProductPubliclyVisible(doc) {
  if (!doc) return false;
  return doc.isActive !== false;
}

function parseBodyBoolean(val, defaultValue) {
  if (val === undefined || val === null || val === "") return defaultValue;
  if (typeof val === "boolean") return val;
  return val === "true" || val === true;
}

// ✅ GET all products
// Query: status=all | active | inactive (default: active only — public / frontend)
router.get("/", async (req, res) => {
  try {
    // Support both query styles:
    //  - ?status=all|active|inactive
    //  - ?active=true|false (requested by frontend)
    let status = req.query.status;
    if (req.query.active !== undefined) {
      const av = String(req.query.active).toLowerCase();
      if (av === "true" || av === "1") status = "active";
      if (av === "false" || av === "0") status = "inactive";
    }

    status = (status || "active").toLowerCase();
    const filter = {};
    if (status === "all") {
      // no isActive filter
    } else if (status === "inactive") {
      filter.isActive = false;
    } else {
      filter.$or = [{ isActive: true }, { isActive: { $exists: false } }];
    }

    const products = await Product.find(filter)
      .populate("category")
      .lean();

    res.json(products);
  } catch {
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
      } catch {
        /* ignore invalid JSON */
      }

      try {
        chemicalComposition = req.body.chemicalComposition
          ? JSON.parse(req.body.chemicalComposition)
          : [];
      } catch {
        /* ignore invalid JSON */
      }

      const product = await Product.create({
        ...req.body,

        colorTones,
        chemicalComposition,

        image: req.files?.image ? req.files.image[0].path : null,

        msds: req.files?.msds ? req.files.msds[0].path : null,

        isActive: parseBodyBoolean(req.body.isActive, true),
      });

      res.json(product);
    } catch (err) {
      console.log("PRODUCT CREATE ERROR 👉", err);

      res.status(500).json({
        message: err.message,
        // Helps debug multipart/mongoose validation failures locally
        details: err?.stack,
      });
    }
  },
);

// ✅ DOWNLOAD MSDS (must be registered before GET /:id or "msds" is captured as :id)
router.get("/msds/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .select("msds isActive")
      .lean();

    if (!isProductPubliclyVisible(product)) {
      return res.status(404).json({
        message: "MSDS not found",
      });
    }

    if (!product?.msds) {
      return res.status(404).json({
        message: "MSDS not found",
      });
    }

    const fileName = product.msds.split("/").pop() + ".pdf";

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/pdf");

    https
      .get(product.msds, (fileStream) => {
        fileStream.on("error", () => {
          if (!res.headersSent) {
            res.status(500).json({ message: "Download failed" });
          }
        });
        fileStream.pipe(res);
      })
      .on("error", () => {
        if (!res.headersSent) {
          res.status(500).json({ message: "Download failed" });
        }
      });
  } catch {
    res.status(500).json({
      message: "Download failed",
    });
  }
});

// ✅ Toggle active (admin) — must be before GET /:id
async function updateProductStatus(req, res) {
  try {
    const { isActive } = req.body;
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        message: "Request body must include boolean isActive",
      });
    }
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true },
    )
      .populate("category")
      .lean();

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update product status" });
  }
}

router.patch("/:id/status", updateProductStatus);
// Backwards-compatible alias (in case any old frontend code is still running)
router.patch("/:id/active", updateProductStatus);

// ✅ GET single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .lean();

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (!isProductPubliclyVisible(product)) {
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
      } catch {
        /* ignore invalid JSON */
      }

      try {
        chemicalComposition = req.body.chemicalComposition
          ? JSON.parse(req.body.chemicalComposition)
          : [];
      } catch {
        /* ignore invalid JSON */
      }

      const payload = {
        ...req.body,

        colorTones,
        chemicalComposition,

        image: imageName,
        msds: msdsFile,
      };

      if (Object.prototype.hasOwnProperty.call(req.body, "isActive")) {
        payload.isActive = parseBodyBoolean(req.body.isActive, true);
      }

      const updated = await Product.findByIdAndUpdate(req.params.id, payload, {
        new: true,
      });

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
