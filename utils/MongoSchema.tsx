import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: false },
    assignedNumber: { type: String, required: true },
    references: { type: [[String]], default: [] },
});