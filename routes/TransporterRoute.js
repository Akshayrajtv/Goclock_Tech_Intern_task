import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
    saveorderTransporterController,
    getMessagesTransportController,
} from "../controllers/transporterController.js";

const router = express.Router();

// Apply authentication middleware to protect the routes
router.use(authMiddleware);

// Get transporter messages
router.get("/messages", authMiddleware, getMessagesTransportController);
router.post("/saveOrder", saveorderTransporterController);

// Create transporter reply

export default router;
