import mongoose from "mongoose";

const { Schema } = mongoose;

const transporterSchema = new Schema({
    price: {
        type: Number,
        required: true,
    },
    reply: {
        type: String,
        required: true,
    },

    orderId: {
        type: String,
        ref: "Manufacturer",
        required: true,
    },

    from: {
        type: String,
        required: true,
    },

    to: {
        type: String,
        required: true,
    },
});

const Transporter = mongoose.model("Transporter", transporterSchema);

export default Transporter;
