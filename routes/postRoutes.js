import express from "express";
import { verifyToken } from "./verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  // res.json({
  //   posts: {
  //     title: " a post title",
  //     description: "you will see this only after you successfully login.",
  //   },
  // });
  res.send(req.user);
});

export default router;
