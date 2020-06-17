const mongoose = require("mongoose");

const blog = new mongoose.Schema({});

blog.pre("save", (next) => {
  let now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("Blog", blog);
