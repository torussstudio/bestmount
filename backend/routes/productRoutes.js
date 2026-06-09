const express = require("express");
const https = require("https");
const router = express.Router();
const upload = require("../multer");
const authenticateToken = require("../middleware/auth");

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
router.get("/", async (req, res, next) => {
  try {
    console.log("GET /api/products called", req.originalUrl);
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

    console.log(`Fetched ${products.length} products from DB`);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// ✅ ADD product
router.post(
  "/",
  authenticateToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "msds", maxCount: 1 },
  ]),
  async (req, res, next) => {
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
      next(err);
    }
  },
);

// ✅ DOWNLOAD MSDS (must be registered before GET /:id or "msds" is captured as :id)
router.get("/msds/:id", async (req, res, next) => {
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
    const client = product.msds.startsWith("https") ? https : require("http");

    client
      .get(product.msds, (fileStream) => {
        if (fileStream.statusCode !== 200) {
          fileStream.resume();
          if (!res.headersSent) {
             return res.status(fileStream.statusCode).json({ message: "File not found or unavailable on CDN" });
          }
          return;
        }

        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        res.setHeader("Content-Type", "application/pdf");

        fileStream.on("error", () => {
          if (!res.headersSent) {
            next(new Error("Download failed"));
          }
        });
        fileStream.pipe(res);
      })
      .on("error", (err) => {
        if (!res.headersSent) {
          next(err);
        }
      });
  } catch (err) {
    next(err);
  }
});

// ✅ Toggle active (admin) — must be before GET /:id
async function updateProductStatus(req, res, next) {
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
  } catch (err) {
    next(err);
  }
}

router.patch("/:id/status", authenticateToken, updateProductStatus);
// Backwards-compatible alias (in case any old frontend code is still running)
router.patch("/:id/active", authenticateToken, updateProductStatus);

// ✅ GET single product
router.get("/:id", async (req, res, next) => {
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
  } catch (err) {
    next(err);
  }
});

// ✅ UPDATE product (replace OR remove image)
router.put(
  "/:id",
  authenticateToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "msds", maxCount: 1 },
  ]),
  async (req, res, next) => {
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

      // remove pdf
if (req.body.removeMsds === "true") {

  msdsFile = null;

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
      next(err);
    }
  },
);

// ✅ DELETE product
router.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
