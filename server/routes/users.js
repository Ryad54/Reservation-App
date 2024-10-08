const express = require("express");
const  {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user.js");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken.js");

const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getUsers);

module.exports = router;
