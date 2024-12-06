import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    fullname: string;
    email: string;
    password: string;
    contact: number;
    isVerified: boolean;
    verificationToken?: string;
    verificationTokenExpiresAt?: Date;
    resetPasswordToken?: string;
    resetPasswordTokenExpiresAt?: Date;
    lastLogin?: Date;
    profilePicture?: string;
    address?: string;
    city?: string;
    country?: string;
}

const userSchema = new mongoose.Schema<IUser>({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiresAt: { type: Date },
    lastLogin: { type: Date },
    profilePicture: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
});

export const User = mongoose.model<IUser>("User", userSchema);
