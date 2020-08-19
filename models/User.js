import { Schema, models, model } from 'mongoose';

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        maxlength: 16,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

export default models.User || model('User', UserSchema);