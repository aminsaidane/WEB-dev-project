const passport = require("passport");
const User = require("../models/User");



 module.exports.regiter = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "fullName, email, and password are required" });
  }

  try {
    // Create user instance (role optional)
    const today = new Date().toISOString().split("T")[0];
    const user = new User({ fullName, email, role,lastLogin:today });

    // passport-local-mongoose handles hashing + saving
    await User.register(user, password);

    res.json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


 module.exports.login = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);

    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    req.logIn(user, async (err) => {
      if (err) return next(err);
      const now = new Date()
      user.lastLogin = now.toISOString().split("T")[0];
      await user.save();
      return res.json({
        message: "Logged in successfully",
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,

        }
      });
    });
  })(req, res, next);
}


 module.exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
}

module.exports.getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ user: null });
  }

  res.json({
    user: {
      _id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role
    },
  });
}




 module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'fullName email role lastLogin').lean(); // only select fields you need
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}





 module.exports.getVets = async (req, res) => {
  try {
    const vets = await User.find({ role: "vet" });
    res.json(vets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch veterinarians" });
  }
}




 module.exports.addUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: "fullName, email, and password are required",
    });
  }

  try {
    // Check if email already exists
    const exists = await User.findOne({ email }).lean();
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

   

    // Create user instance without password
    const newUser = new User({
      fullName,
      email,
      role: role || "adopter",
      lastLogin: null,
    });

    // passport-local-mongoose handles hashing + saving
    await User.register(newUser, password);

    res.json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        lastLogin: newUser.lastLogin,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error creating user" });
  }
}



 module.exports.editUser =  async (req, res) => {
  try {
    const { fullName, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, email, role },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}



 module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
console.log(id)
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}