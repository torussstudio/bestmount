const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: (req, file) => {
    // PDF file
    if (file.mimetype === "application/pdf") {
      const cleanName = file.originalname
        .replace(/\.[^/.]+$/, "") // remove extension
        .replace(/[^a-zA-Z0-9-_]/g, "_"); // remove special characters

      return {
        folder: "bestmount_msds",

        resource_type: "raw",

        public_id: cleanName,

        format: "pdf",
      };
    }

    // Image file
    return {
      folder: "bestmount_products",

      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image or pdf allowed"), false);
  }
};

module.exports = multer({
  storage,

  fileFilter,
});
