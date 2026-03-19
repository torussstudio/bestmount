const mongoose = require("mongoose");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("MongoDB Connected");

  const adminExists = await Admin.findOne({ username: "admin" });

  if (adminExists) {
    console.log("Admin already exists");
  } else {
    await Admin.create({
      username: "admin",
      password: "123456",
    });
    console.log("Admin created");
  }

  process.exit();
});