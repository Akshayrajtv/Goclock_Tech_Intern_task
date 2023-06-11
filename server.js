import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import manufactureRoute from "./routes/ManufacturerRoute.js";
import transporterRoute from "./routes/TransporterRoute.js";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/api/user", userRoute);
app.use("/api/manufacturer", manufactureRoute);
app.use("/api/transporter", transporterRoute);

//static files

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./client/build")));

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});
