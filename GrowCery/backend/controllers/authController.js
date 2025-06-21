import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, userType: user.userType },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '24h' }
        );
        
        // Send response with token
        res.status(200).json({
            success: true,
            token
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const signup = async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, password } = req.body;
        
        // Check required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Required fields missing'
            });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = new User({
            firstName,
            middleName,
            lastName,
            email,
            password: hashedPassword,
            userType: 'customer' // Default to customer role
        });
        
        // Save user to database
        await newUser.save();
        
        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, userType: newUser.userType },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '24h' }
        );
        
        // Send response with token
        res.status(201).json({
            success: true,
            token
        });
        
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};