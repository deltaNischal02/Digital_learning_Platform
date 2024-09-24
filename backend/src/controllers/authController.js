const User = require("../models/userModel");
const bcrypt = require("bcryptjs"); // to hash and compare password
const jwt = require("jsonwebtoken"); // to generate tokens

// Register
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
      email,
      role,
      phoneNumber,
      employeeId,
      level,
      department,
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName, 
      username,
      password: hashedPassword,
      email,
      role, 
      phoneNumber,
      employeeId,
      level,
      department,
    });

    // Save the user in the database
    await newUser.save();

    // Response on successful registration
    res.status(201).json({
      message: `User Registered with username ${username}`,
    });
  } catch (error) {
    // Send proper error message
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    // If username not found
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with username ${username} not found` });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the token and user info (without password)
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        level: user.level,
        department: user.department,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = {
  register,
  login,
};
