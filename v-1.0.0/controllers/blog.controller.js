const Blog = require("../models/blog.model");
const { verifyToken } = require("../helpers/token");
class BlogCtrl {
  static createBlog(req, res) {
    const content = req.body;
    const blogObj = new Blog(content);

    blogObj
      .save()
      .then((result) => {
        res.status(200).send({ message: "Blog created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created a blog", error: err });
      });
  }
  // end of createBlog

  // updateBlog
  static updateBlog(req, res) {
    const { id } = req.params;
    const content = req.body;
    const token = req.headers.authorization;
    var payload = verifyToken(token);
    var { role } = payload;
    if (role == "admin") {
      Blog.findByIdAndUpdate(id, content, { new: true }, (err, result) => {
        if (err)
          res
            .status(404)
            .send({ message: "Could not updated the blog", error: err });
        else
          res.status(200).send({
            message: "Blog updated successsfully",
            data: result,
          });
      });
    } else {
      res.status(403).send({ message: "You have no access" });
    }
  }
  // end of updateBlog

  // deleteBlog
  static deleteBlog(req, res) {
    const { id } = req.params;
    const token = req.headers.authorization;
    var payload = verifyToken(token);
    var { role } = payload;
    if (role == "admin") {
      Blog.findByIdAndUpdate(
        id,
        { status: 2 },
        { new: true },
        (err, result) => {
          if (err)
            res
              .status(404)
              .send({ message: "Could not deleted the blog", error: err });
          else
            res.status(200).send({
              message: "Blog deleted successsfully",
              data: result,
            });
        }
      );
    } else {
      res.status(403).send({ message: "You have no access" });
    }
  }
  // end of deleteBlog

  // getBlog
  static getBlog(req, res) {
    const { id } = req.params;

    Blog.findOne({
      _id: id,
      $or: [{ status: 1 }, { status: 0 }],
    })
      .populate({
        path: "createdBy",
        select: ["first_name", "last_name", "_id", "mobile", "email"],
      })
      .populate({
        path: "updatedBy",
        select: ["first_name", "last_name", "_id", "mobile", "email"],
      })
      .exec()
      .then((result) => {
        res.status(200).send({ message: "Blog ", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the blog", error: err });
      });
  }
  // end of getBlog

  // getBlogs
  static getAllBlogs(req, res) {
    Blog.find({
      $or: [{ status: 0 }, { status: 1 }],
    })
      .populate({
        path: "createdBy",
        select: ["first_name", "last_name", "_id", "mobile", "email"],
      })
      .populate({
        path: "updatedBy",
        select: ["first_name", "last_name", "_id", "mobile", "email"],
      })
      .exec()
      .then((result) => {
        res.status(200).send({ message: "Blog List", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the blogs", error: err });
      });
  }
  // end of getBlogs

  // getBlogByUser
  static getBlogByUser(req, res) {
    const { id } = req.params;

    Blog.find({
      createdBy: id,
      $or: [{ status: 1 }, { status: 0 }],
    })
      .populate({
        path: "createdBy",
        select: ["first_name", "last_name", "_id", "mobile", "email"],
      })
      .populate({
        path: "updatedBy",
        select: ["first_name", "last_name", "_id", "mobile", "email"],
      })
      .exec()
      .then((result) => {
        res.status(200).send({ message: "Blog ", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the blog", error: err });
      });
  }
  // end of getBlogByUser
}

module.exports = BlogCtrl;
