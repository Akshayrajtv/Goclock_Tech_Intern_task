import Message from "../models/manufacturerModel.js";

import users from "../models/userModel.js";

import Transporter from "../models/transporterModel.js";

// Controller to fetch messages for the current transporter
export const getMessagesTransportController = async (req, res) => {
    try {
        const username = req.user.userId;
        // Assuming the current user's username is available in req.user

        // Find the transporter based on the username
        const transporter = await users.findById(username);

        if (!transporter) {
            return res.status(404).json({ error: "Transporter not found." });
        }

        // Fetch messages where the 'to' field matches the transporter's username
        const messages = await Message.find({ to: transporter.username });

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while fetching messages.",
        });
    }
};

export const saveorderTransporterController = async (req, res) => {
    try {
        const { orderId, price, reply, from, to } = req.body;
        // Create a new Transporter instance
        const transporter = new Transporter({
            orderId,
            price,
            reply,
            from,
            to,
        });

        await transporter.save();

        res.status(200).json({ message: "Order saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving order", error });
    }
};
