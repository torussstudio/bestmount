const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("MongoDB Connected");

  const adminExists = await Admin.findOne({ username: "admin" });

  if (adminExists) {
    // Update existing admin with hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);
    
    adminExists.password = hashedPassword;
    await adminExists.save();
    console.log("Admin password updated with hashing");
  } else {
    // Hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    await Admin.create({
      username: "admin",
      password: hashedPassword,
    });
    console.log("Admin created with hashed password");
  }

  process.exit();
});