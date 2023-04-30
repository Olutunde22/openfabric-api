
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Firstname is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [7, 'Password should be at least 7 characters'],
    },
    salt: {
        type: String,
        required: [true, 'Password salt is required'],
    }
}, { timestamps: true })


const User = new mongoose.model('User', UserSchema)

export default User