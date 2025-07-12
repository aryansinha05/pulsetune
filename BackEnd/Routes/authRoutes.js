import express from "express";
import passport from "passport";
import {
  signup,
  login,
  userExist,
  logout,
  fetchMusicData,
} from "../Controllers/authController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import ErrorHandler from "../middlewares/error.js";

const router = express.Router();

router.get("/", (req, res) => console.log(req.user));
router.post("/signup", signup);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(new ErrorHandler("Enter Valid Credentials", 401));

    req.logIn(user, (err) => {
      if (err) return next(err);
      return login(req, res, next);
    });
  })(req, res, next);
});

router.get("/userExist", isAuthenticated, userExist);
router.get("/logout", isAuthenticated, logout);
router.get("/fetchData", isAuthenticated, fetchMusicData);
router.get("/test-session", (req, res) => {
  req.session.test = "hello";
  res.send("Session set");
});

export default router;
