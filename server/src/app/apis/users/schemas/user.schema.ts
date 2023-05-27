import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Please enter at least 8 characters.'],
        max: [32, 'Please enter no more than 32 characters.']
    },
    status: {
        type: String,
        required: true
    }
});