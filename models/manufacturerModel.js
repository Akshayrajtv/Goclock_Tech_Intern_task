import mongoose from "mongoose";

const { Schema } = mongoose;

const manufacturerSchema = new Schema({
    orderID: {
        type: String,
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
    quantity: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    transid: {
        type: String,
        required: true,
    },
    manuid: {
        type: String,
        required: true,
    },
});

const Manufacturer = mongoose.model("manufacturer", manufacturerSchema);

export default Manufacturer;
