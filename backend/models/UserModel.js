import mongoose from "mongoose";
const Users = mongoose.Schema({
    name: String,
    email: {
        unique: true,
        type: String
    },
    role: String,
    password: String,
})

export default mongoose.model("Users",Users)