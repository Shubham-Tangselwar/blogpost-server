const express = require("express");

const BlogCtrl = require("../controllers/blog.controller");
const router = express.Router();

router.get("/:id", BlogCtrl.getBlog);

router.post("/", BlogCtrl.createBlog);

router.put("/:id", BlogCtrl.updateBlog);

router.delete("/:id", BlogCtrl.deleteBlog);

router.get("/", BlogCtrl.getAllBlogs);

module.exports = router;
