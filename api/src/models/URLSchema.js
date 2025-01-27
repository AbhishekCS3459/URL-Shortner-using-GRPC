const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const URLModel = new Schema({
  shortUrlId: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  userId: { type: String, required: true },
  clicks: { type: Number, required: false, default: 0 },
  metadata: {
    title: { type: String },
    description: { type: String },
    imageURL: { type: String },
  },
  isActive: { type: Boolean, required: true },
});

module.exports = model("URL", URLModel);
