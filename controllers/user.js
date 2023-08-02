const db = require('../models')
const bcrypt = require('bcrypt');
const {generateToken}=require("../middleware/auth")
// model
const User = db.user



const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create user.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token =generateToken(user.id,"user")

    return res.status(200).json({ message: 'Login successful.' ,token});
  } catch (error) {
    return res.status(500).json({ error: 'Failed to login.' });
  }
};

module.exports = {
  createUser,
  loginUser,
};

