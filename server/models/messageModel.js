import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type:String,trim:true},
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
    sender:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
},{timestamps:true});

export default mongoose.model("Message",messageSchema);