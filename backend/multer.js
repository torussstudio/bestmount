const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: (req, file) => {

    // MSDS PDF
    if (file.fieldname === "msds") {

      const cleanName = file.originalname
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .toLowerCase();

      return {

        folder: "bestmount_msds",

        resource_type: "raw",   // important

        type: "upload",         // public file

        public_id: cleanName

      };
    }

    // PRODUCT IMAGE
    return {

      folder: "bestmount_products",

      resource_type: "image"

    };
  }
});

const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "application/pdf"
  ];

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(new Error("Only image or pdf allowed"), false);

  }

};

module.exports = multer({
  storage,
  fileFilter
});