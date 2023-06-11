import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { username, password, role, address } = req.body;

        // Validation
        if (!username) {
            return res.status(400).send({ message: "Username is required" });
        }
        if (!password) {
            return res.status(400).send({ message: "Password is required" });
        }
        if (!role) {
            return res.status(400).send({ message: "Role is required" });
        }
        if (!address) {
            return res.status(400).send({ message: "Address is required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Username is already registered. Please login.",
            });
        }

        // Register user
        const hashedPassword = await hashPassword(password);
        const user = new User({
            username,
            password: hashedPassword,
            role,
            address,
        });
        await user.save();

        res.status(201).send({
            success: true,
            message: "User registered successfully!",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Compare passwords
        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password",
            });
        }

        //Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5d",
        });

        // Login successful

        res.status(200).send({
            success: true,
            message: "Login successful!",
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

export const checkUserController = async (req, res) => {
    try {
        const { username } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        // User exists
        res.status(200).send({
            success: true,
            message: "User found",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in checking user",
            error,
        });
    }
};

export const getTransporterController = async (req, res) => {
    try {
        const transporters = await User.find(
            { role: "Transporter" },
            "username"
        );
        res.status(200).json({
            success: true,
            transporters,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in checking user",
            error,
        });
    }
};
