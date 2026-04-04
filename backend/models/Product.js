const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    shortName: String,

    // ✅ index: true — avoids full collection scan when filtering by category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
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

    image: String,

    msds: String,

    /** When false, product is hidden from public site (admin still sees with ?status=all). */
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
