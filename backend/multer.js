// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const uploadPath = path.join(__dirname, "uploads");
// console.log("UPLOAD PATH =", uploadPath);

// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// const storage = multer.diskStorage({

//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },

//   filename: (req, file, cb) => {
//     const uniqueName =
//       Date.now() + path.extname(file.originalname);

//     cb(null, uniqueName);
//   }

// });

// const fileFilter = (req, file, cb) => {

//   const allowedTypes = [
//     "image/png",
//     "image/jpg",
//     "image/jpeg",
//     "image/webp",
//     "application/pdf"
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image or pdf allowed"), false);
//   }

// };

// module.exports = multer({
//   storage,
//   fileFilter
// });

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinary");

const storage = new CloudinaryStorage({

 cloudinary,

 params: {

  folder: "bestmount_products",

  allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],

 },

});

const fileFilter = (req, file, cb) => {

 const allowedTypes = [

  "image/png",
  "image/jpg",
  "image/jpeg",
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