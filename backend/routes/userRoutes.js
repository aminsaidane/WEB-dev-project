const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

/* ===========================
   SIGNUP (REGISTER)
   =========================== */
router.post("/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "fullName, email, and password are required" });
  }

  try {
    // Create user instance (role optional)
    const user = new User({ fullName, email, role });

    // passport-local-mongoose handles hashing + saving
    await User.register(user, password);

    res.json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


/* ===========================
   LOGIN
   =========================== */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.json({
        message: "Logged in successfully",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        }
      });
    });
  })(req, res, next);
});


/* ===========================
   LOGOUT
   =========================== */
router.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
});


/* ===========================
   CHECK CURRENT USER (Session)
   =========================== */
router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ user: null });
  }

  res.json({
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role
    },
  });
});


module.exports = router;
