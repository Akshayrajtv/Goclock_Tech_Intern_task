import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Manufacturer", "Transporter"],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("users", userSchema);

export default User;
