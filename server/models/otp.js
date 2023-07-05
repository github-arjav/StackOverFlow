import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: String,
    code: String
})

export default mongoose.model('otp', otpSchema, 'otp')