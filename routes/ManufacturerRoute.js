import express from "express";
import {
    createManufacturerResponse,
    getManufacturerResponse,
    getManufacturerResponseById,
    getRepliesManufacturerController
   
} from "../controllers/manufacturerController.js";

const router = express.Router();

// Create a new manufacturer
router.post("/create-response", createManufacturerResponse);

// Get all manufacturers
router.get("/get-response", getManufacturerResponse);

// Get a specific manufacturer by ID
router.get("/get-response/:id", getManufacturerResponseById);

router.get("/get-replies",getRepliesManufacturerController)


export default router;
