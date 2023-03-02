import express from "express";
import {
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  UnFollowUser,
  updateUser,
} from "../Controllers/UserController.js";
import AuthMiddleWare from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", AuthMiddleWare, updateUser);
router.delete("/:id", AuthMiddleWare, deleteUser);
router.put("/:id/follow", AuthMiddleWare, followUser);
router.put("/:id/unfollow", AuthMiddleWare, UnFollowUser);

//testing Route
// router.get("/", async (req, res) => {
//   res.send("User Route");
// });

export default router;
