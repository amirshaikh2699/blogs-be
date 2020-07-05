const mongoose = require("mongoose");

const blog = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  name: { type: String, required: true },
  blogimage: { type: String },
  country: { type: String, required: true },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

blog.pre("save", (next) => {
  let now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("Blog", blog);
