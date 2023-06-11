import Manufacturer from "../models/manufacturerModel.js";
import transporter from "../models/transporterModel.js";

// Create a new manufacturer response
export const createManufacturerResponse = async (req, res) => {
    try {
        const { orderID, from, to, quantity, address, transid, manuid } =
            req.body;

        // Create a new Manufacturer instance
        const manufacturer = new Manufacturer({
            orderID,
            from,
            to,
            quantity,
            address,
            transid,
            manuid,
        });

        // Save the manufacturer response
        const savedManufacturer = await manufacturer.save();

        res.status(201).json({
            success: true,
            message: "Manufacturer response created",
            manufacturer: savedManufacturer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in creating manufacturer response",
            error,
        });
    }
};

// Get all manufacturer responses
export const getManufacturerResponse = async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find();

        res.status(200).json({
            success: true,
            manufacturers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching manufacturer responses",
            error,
        });
    }
};

// Get a specific manufacturer response by ID
export const getManufacturerResponseById = async (req, res) => {
    try {
        const { id } = req.params;

        const manufacturer = await Manufacturer.findOne({ users: id }).populate(
            "users"
        );

        if (!manufacturer) {
            return res.status(404).json({
                success: false,
                message: "Manufacturer response not found",
            });
        }

        res.status(200).json({
            success: true,
            manufacturer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching manufacturer response",
            error,
        });
    }
};

export const getRepliesManufacturerController = async (req, res) => {
    try {
        const replies = await transporter.find();
        res.json({ replies });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching transporter replies",
            error,
        });
    }
};
