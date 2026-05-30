import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../validators/userValidator.js';

// Handle User Registration
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const validation = registerSchema.safeParse({username, email, password});
    if (!validation.success) {
      return res.status(400).json({message: validation.error.issues})
    }

    const existingUser = await User.findOne({$or: [{username}, {email}]}) // don't use {username, email} because then someone can register with same email with different username.
    if (existingUser) {
      return res.status(400).json({message: "User with this username or email already exists"})
    }

    const newUser = new User({username, email, password});
    await newUser.save();

    return res.status(201).json({message: "User registered successfully", user: {id: newUser._id, username: newUser.username, email: newUser.email}})
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Handle User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: Practice task - Authenticate user and issue JWT
    // 1. Validate inputs (check if email and password are provided). Return 400 if missing.
    // 2. Find the user in the database by email. If not found, return 401 (Unauthorized) with a generic message.
    // 3. Compare the provided password with the stored hashed password using user.comparePassword().
    // 4. If password does not match, return 401 (Unauthorized).
    // 5. Generate a JWT token containing the user's ID as the payload: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    // 6. Return a 200 (OK) response with the token and user details (id, username, email).
    const validattion = loginSchema.safeParse({email, password})
    if (!validattion.success) {
      return res.status(400).json({message: validattion.error.issues})
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({message: "Unauthorized: Invalid email"})
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({message: "Unauthorized: Invalid password"})
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({message: "Login successful", token, user: {id: user._id, username: user.username, email: user.email}})

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
