import mongoose from "mongoose";
const Events = mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    vendorName:{
        type:String,
        required:true,
    },    
    selectedDate:{
        type:Date,
        required:false,
    },
    optionsDate:{
        firstDate: {
            type:Date,
            required:true,
        },
        secondDate: {
            type:Date,
            required:true,
        },
        lastDate: {
            type:Date,
            required:true,
        }
    },
    proposeLoc:{
        type: String,
        required: true,
        default: ''
    },
    status: {
        type:String,
        required:true,
    },    
    reason: {
        type:String,
        required:false,
    },
    createdDate:{
        type:Date,
        required:true,
        default: new Date()
    },
    confirmedDate:{
        type:Date,
        required:false,
    },
    company: {
        type:String,
        required:true,
    }, 
})

export default mongoose.model("Events",Events)