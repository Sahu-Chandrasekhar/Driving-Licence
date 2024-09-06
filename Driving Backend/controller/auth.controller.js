const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const DlUser = require('../models/dluser.model');
require("dotenv").config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                error: 'Email and password are required fields.',
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid credentials. User not found.',
            });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid credentials. Password is incorrect.',
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '8h' } // You can adjust the expiration time
        );

        res.json({
            status: 200,
            message: 'Login successful',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

const signUp = async (req, res) => {

    try {
        const { authType, name, email, phone, password, gender } = req.body;

        if (!authType || !["Admin", "User"].includes(authType)) {
            return res.status(400).json({
                status: 400,
                error: 'Invalid authType. Must be one of: Admin, User, Emp.',
            });
        }

        if (!name || !email || !phone || !password || !gender) {
            return res.status(400).json({
                status: 400,
                error: 'All fields (authType, name, email, phone, password, gender) are required.',
            });
        }

        // Check if the email is already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                error: 'Email is already registered.',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new User({
            authType,
            name,
            email,
            phone,
            gender,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Return the response
        res.status(201).json({
            status: 201,
            message: 'User created successfully',
            data: savedUser,
        });
    } catch (error) {
        // Handle unexpected errors
        console.error('Error creating user:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('dluser');
        if (users.length === 0) {
            res.status(404).json({ message: 'Data not Found' });
        } else {
            res.status(201).json({
                status: 201,
                message: "success",
                data: users,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

const DeleteUser = async (req, res) => {
    try {
        const userId = req.body.Id;

        // Find the user by ID and delete
        const deletedUserData = await User.findByIdAndDelete(userId);

        if (!deletedUserData) {
            return res.status(404).json({
                status: 404,
                message: "User Data not found",
            });
        }

        // If the user is deleted, delete associated DLUser data
        const deleteManyDlUser = await DlUser.deleteMany({ _id: { $in: deletedUserData.dluser } });
        if (!deleteManyDlUser) {
            return res.status(404).json({
                status: 404,
                message: "Delete many unsuccessfull",
            });
        }

        res.status(200).json({
            status: 200,
            message: "User and associated DLUser data deleted successfully",
            data: deletedUserData,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};


module.exports = {
    login, signUp, getAllUsers, DeleteUser
};




