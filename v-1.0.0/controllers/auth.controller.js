const { verifyToken, createToken } = require("../helpers/token");
const User = require("../models/user.model");
class AuthController {
  static refreshToken(req, res) {
    const token = req.headers.authorization;
    console.log("Token - ", token);
    if (!token) {
      res.status(403).send({ message: "You need to login", error: null });
    } else {
      try {
        var payload = verifyToken(token);
      } catch {
        res.status(401).send({ message: "You need to login", error: null });
      }
      if (!payload) {
        res.status(401).send({ message: "You need to login", error: null });
      } else {
        const { id, role } = payload;
        const token = createToken({ id, role });
        res.set("x-token", token);

        User.findOne({
          _id: id,
          $or: [{ status: 1 }, { status: 0 }],
        })
          .select("name mobile email userId age status role createdAt")
          .populate("hospitalId")
          .exec()
          .then((result) => {
            console.log("user- ", result);
            res.status(200).send({ message: "User", data: result });
          })

          .catch((err) => {
            console.log(err);
            res
              .status(404)
              .send({ message: "Could not load the user", error: err });
          });
      }
    }
  } //refershToken
}

module.exports = AuthController;
