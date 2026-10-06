const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    profileImage: { type: String, default: "" },
    travelPreferences: {
      style: { type: String, default: "Independent & unhurried" },
      interests: { type: [String], default: [] },
      budgetBand: { type: String, default: "Mid-range" },
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    lastCheckIn: { type: Date, default: null },
    sosActive: { type: Boolean, default: false },
    lastSosAt: { type: Date, default: null },
  },
  { timestamps: true },
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
