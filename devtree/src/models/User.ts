import { model, Schema } from "mongoose";

interface IUser {
    handle: string;
    name: string;
    email: string;
    password: string;
}

const UserSchema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        unique: true
    },
})

const User = model<IUser>('User', UserSchema);
export default User;