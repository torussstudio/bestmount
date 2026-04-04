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
  const allowedImageTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  const isImage = allowedImageTypes.includes(file.mimetype);

  // Some browsers upload PDFs with "application/octet-stream".
  const isPdf =
    file.mimetype === "application/pdf" ||
    (file.originalname &&
      file.originalname.toLowerCase().endsWith(".pdf"));

  if (isImage || isPdf) {
    return cb(null, true);
  }

  return cb(new Error("Only image or pdf allowed"), false);
};

module.exports = multer({
  storage,
  fileFilter
});