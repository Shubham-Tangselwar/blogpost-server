const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const blogSchema = new Schema({
  blogId: { type: Number },
  title: { type: String, minlength: 5, required: true },
  shortContent: { type: String, minlength: 5, required: true },
  content: { type: String, minlength: 5, required: true },
  status: Number,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
});

blogSchema.plugin(AutoIncrement, { inc_field: "blogId" });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
