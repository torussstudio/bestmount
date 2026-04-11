// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// require("dotenv").config();

// const Admin = require("./models/Admin");

// mongoose.connect(process.env.MONGO_URI).then(async () => {
//   console.log("MongoDB Connected");

//   const adminExists = await Admin.findOne({ username: "admin" });

//   if (adminExists) {
//     // Update existing admin with hashed password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash("bM+852J", salt);
    
//     adminExists.password = hashedPassword;
//     await adminExists.save();
//     console.log("Admin password updated with hashing");
//   } else {
//     // Hash password before storing
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash("bM+852J", salt);

//     await Admin.create({
//       username: "admin",
//       password: hashedPassword,
//     });
//     console.log("Admin created with hashed password");
//   }

//   process.exit();
// });

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Admin = require("./models/Admin");

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("MongoDB Connected");

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error("Missing ADMIN credentials in .env");
    process.exit(1);
  }

  const adminExists = await Admin.findOne({ username: ADMIN_USERNAME });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

  if (adminExists) {
    adminExists.password = hashedPassword;
    await adminExists.save();
    console.log("Admin password updated");
  } else {
    await Admin.create({
      username: ADMIN_USERNAME,
      password: hashedPassword,
    });
    console.log("Admin created");
  }

  process.exit();
});