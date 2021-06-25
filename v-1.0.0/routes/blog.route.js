const express = require("express");
const { verifyToken } = require("../helpers/token");
const BlogCtrl = require("../controllers/blog.controller");
const router = express.Router();

router.get("/getBlogByUser/:id", authentication, BlogCtrl.getBlogByUser);

router.get("/:id", authentication, BlogCtrl.getBlog);

router.post("/", authentication, BlogCtrl.createBlog);

router.put("/:id", authentication, BlogCtrl.updateBlog);

router.delete("/:id", authentication, BlogCtrl.deleteBlog);

router.get("/", BlogCtrl.getAllBlogs);

function authentication(req, res, next) {
  const token = req.headers.authorization;

  if (token == null) res.status(401).send({ message: "Login First" });
  try {
    var payload = verifyToken(token);
  } catch {
    res.status(403).send({ message: "Invalid Token" });
  }
  if (!payload) {
    res.status(401).send({ message: "You need to login", error: null });
  } else {
    next();
  }
}
module.exports = router;
