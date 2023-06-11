import express from "express";
import {
    registerController,
    loginController,
    checkUserController,
    getTransporterController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/checkUser", checkUserController);

router.get("/get-transporters", getTransporterController);

export default router;
