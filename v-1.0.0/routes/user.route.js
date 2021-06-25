const express = require("express");
const { verifyToken } = require("../helpers/token");
const UserCtrl = require("../controllers/user.controller");
const router = express.Router();

router.get("/:id", authentication, UserCtrl.getUser);

router.post("/", authentication, UserCtrl.createUser);

router.put("/:id", authentication, UserCtrl.updateUser);

router.delete("/:id", authentication, UserCtrl.deleteUser);

router.get("/", authentication, UserCtrl.getAllUsers);

router.post("/login", UserCtrl.authenticate);

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
