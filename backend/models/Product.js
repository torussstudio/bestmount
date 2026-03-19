const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    shortName: String,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    colorTones: [
      {
        name: String,
        color: String,
      },
    ],

    bulkDensity: Number,

    fusedProcess: String,

    chemicalComposition: [
      {
        name: String,
        typical: String,
        min: String,
        max: String,
      },
    ],

    remarks: String,

    sizing: String,

    industrialApplication: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);