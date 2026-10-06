const mongoose = require("mongoose");

const packingItemSchema = new mongoose.Schema(
  {
    label: String,
    packed: { type: Boolean, default: false },
  },
  { _id: true },
);

const packingCategorySchema = new mongoose.Schema(
  {
    name: String,
    items: [packingItemSchema],
  },
  { _id: true },
);

const packingListSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    destination: String,
    duration: String,
    categories: { type: [packingCategorySchema], default: [] },
  },
  { timestamps: true },
);

packingListSchema.index({ user: 1, trip: 1 }, { unique: true });

module.exports = mongoose.model("PackingList", packingListSchema);
