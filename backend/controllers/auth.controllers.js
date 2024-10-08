import User from '../model/user.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from '../utils/generateToken.js';
import BlacklistedToken from '../model/blacklistedToken.model.js'

// Signup Controller
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Perform input validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new record
        const user = new User({ fullname: name, email, password: hashedPassword });

        // save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate token
        const token = generateToken(user._id);

        // Respond with user details
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Logout Controller
export const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: Invalid Token" });
        }

        // Save the token to the blacklist
        const blacklistedToken = new BlacklistedToken({ token });
        await blacklistedToken.save();

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};